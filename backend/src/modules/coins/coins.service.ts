import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  APPLICATION_TRANSITIONS,
  ApplicationStatus,
} from '../../common/enums/application-status.enum';
import { AuditService } from '../audit/audit.service';
import { InvestmentsService } from '../investments/investments.service';
import { MetalsService } from '../metals/metals.service';
import { AddApplicationDocumentDto } from './dto/add-application-document.dto';
import { CreateApplicationDto } from './dto/create-application.dto';
import { PriceCalculatorDto } from './dto/price-calculator.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';
import { UpdateProductionTaskDto } from './dto/update-production-task.dto';
import { ApplicationDocument } from './entities/application-document.entity';
import { ApplicationStatusHistory } from './entities/application-status-history.entity';
import { CoinApplication } from './entities/coin-application.entity';
import { ProductionTask } from './entities/production-task.entity';
import {
  calculateCoinPrice,
  COIN_METAL,
} from './utils/price-calculator.util';

@Injectable()
export class CoinsService {
  private readonly logger = new Logger(CoinsService.name);
  private readonly defaultPurity = 99.9;

  constructor(
    @InjectRepository(CoinApplication)
    private readonly appsRepo: Repository<CoinApplication>,
    @InjectRepository(ApplicationStatusHistory)
    private readonly historyRepo: Repository<ApplicationStatusHistory>,
    @InjectRepository(ApplicationDocument)
    private readonly docsRepo: Repository<ApplicationDocument>,
    @InjectRepository(ProductionTask)
    private readonly productionRepo: Repository<ProductionTask>,
    private readonly metalsService: MetalsService,
    private readonly investmentsService: InvestmentsService,
    private readonly auditService: AuditService,
  ) {}

  async calculatePrice(dto: PriceCalculatorDto) {
    const metal = COIN_METAL[dto.coinType];
    const pricePerGram = await this.metalsService.getPricePerGram(metal);
    const breakdown = calculateCoinPrice({
      coinType: dto.coinType,
      quantity: dto.quantity,
      metalPurity: dto.metalPurity ?? this.defaultPurity,
      metalPricePerGram: pricePerGram,
      financingTerm: dto.financingTerm,
    });

    return {
      message: 'Price calculated successfully.',
      coinType: dto.coinType,
      quantity: dto.quantity,
      metalPurity: dto.metalPurity ?? this.defaultPurity,
      ...breakdown,
    };
  }

  async createApplication(userId: string, dto: CreateApplicationDto) {
    const metal = COIN_METAL[dto.coinType];
    const pricePerGram = await this.metalsService.getPricePerGram(metal);
    const breakdown = calculateCoinPrice({
      coinType: dto.coinType,
      quantity: dto.quantity,
      metalPurity: this.defaultPurity,
      metalPricePerGram: pricePerGram,
      financingTerm: dto.financingTerm,
    });

    const app = await this.appsRepo.save(
      this.appsRepo.create({
        userId,
        coinType: dto.coinType,
        quantity: dto.quantity,
        metalPurity: this.defaultPurity.toFixed(2),
        specialRequest: dto.specialRequest ?? null,
        coinValue: breakdown.totalUsd.toFixed(2),
        financingTerm: dto.financingTerm ?? null,
        monthlyPayment: breakdown.monthlyPaymentUsd?.toFixed(2) ?? null,
        downPayment: breakdown.downPaymentUsd.toFixed(2),
        manufacturingFee: breakdown.manufacturingFeeUsd.toFixed(2),
        platformFee: breakdown.platformFeeUsd.toFixed(2),
        status: ApplicationStatus.Submitted,
      }),
    );

    await this.recordStatusChange(
      app.id,
      null,
      ApplicationStatus.Submitted,
      userId,
      'Application submitted.',
    );

    await this.auditService.log({
      action: 'APPLICATION_SUBMITTED',
      entityType: 'coin_application',
      entityId: app.id,
      actorId: userId,
    });

    return {
      message: 'Application submitted successfully.',
      application: app,
    };
  }

  async findUserApplications(userId: string) {
    const applications = await this.appsRepo.find({
      where: { userId },
      order: { submittedAt: 'DESC' },
    });
    return {
      message: 'Applications retrieved successfully.',
      applications,
    };
  }

  async findUserApplication(userId: string, id: string) {
    const app = await this.findApplicationOrFail(id);
    if (app.userId !== userId) {
      throw new ForbiddenException('You do not have access to this application.');
    }
    return this.getApplicationDetail(app);
  }

  async findAllApplications(filters: {
    status?: ApplicationStatus;
    coinType?: string;
    from?: string;
    to?: string;
  }) {
    const qb = this.appsRepo
      .createQueryBuilder('app')
      .leftJoinAndSelect('app.user', 'user')
      .orderBy('app.submitted_at', 'DESC');

    if (filters.status) {
      qb.andWhere('app.status = :status', { status: filters.status });
    }
    if (filters.coinType) {
      qb.andWhere('app.coin_type = :coinType', { coinType: filters.coinType });
    }
    if (filters.from) {
      qb.andWhere('app.submitted_at >= :from', { from: filters.from });
    }
    if (filters.to) {
      qb.andWhere('app.submitted_at <= :to', { to: filters.to });
    }

    const applications = await qb.getMany();
    return {
      message: 'Applications retrieved successfully.',
      applications,
    };
  }

  async findApplicationById(id: string) {
    const app = await this.findApplicationOrFail(id);
    return this.getApplicationDetail(app);
  }

  async updateStatus(
    actorId: string,
    id: string,
    dto: UpdateApplicationStatusDto,
  ) {
    const app = await this.findApplicationOrFail(id);
    const allowed = APPLICATION_TRANSITIONS[app.status] ?? [];

    if (!allowed.includes(dto.status)) {
      throw new UnprocessableEntityException(
        `Cannot transition from "${app.status}" to "${dto.status}".`,
      );
    }

    const fromStatus = app.status;
    app.status = dto.status;

    if (dto.rejectionNote) app.rejectionNote = dto.rejectionNote;
    if (dto.status === ApplicationStatus.UnderReview) {
      app.reviewedAt = new Date();
    }
    if (dto.status === ApplicationStatus.Approved) {
      app.approvedAt = new Date();
    }
    if (dto.status === ApplicationStatus.Delivered) {
      app.deliveredAt = new Date();
    }

    const saved = await this.appsRepo.save(app);

    await this.recordStatusChange(
      id,
      fromStatus,
      dto.status,
      actorId,
      dto.note ?? null,
    );

    if (dto.status === ApplicationStatus.ProductionQueue) {
      await this.productionRepo.save(
        this.productionRepo.create({
          applicationId: id,
          progressPercent: 0,
        }),
      );
    }

    if (dto.status === ApplicationStatus.FundsReceived && saved.coinValue) {
      await this.investmentsService.createFromApplication(
        saved.userId,
        saved.id,
        saved.coinValue,
      );
    }

    await this.auditService.log({
      action: 'APPLICATION_STATUS_CHANGED',
      entityType: 'coin_application',
      entityId: id,
      actorId,
      metadata: { from: fromStatus, to: dto.status },
    });

    return {
      message: `Application status updated to "${dto.status}".`,
      application: saved,
    };
  }

  async addDocument(
    userId: string,
    applicationId: string,
    dto: AddApplicationDocumentDto,
    isStaff = false,
  ) {
    const app = await this.findApplicationOrFail(applicationId);
    if (!isStaff && app.userId !== userId) {
      throw new ForbiddenException('You do not have access to this application.');
    }

    const doc = await this.docsRepo.save(
      this.docsRepo.create({
        applicationId,
        name: dto.name,
        fileUrl: dto.fileUrl,
        type: dto.type ?? 'other',
        uploadedById: userId,
      }),
    );

    return {
      message: 'Document added successfully.',
      document: doc,
    };
  }

  async updateProduction(
    applicationId: string,
    dto: UpdateProductionTaskDto,
  ) {
    await this.findApplicationOrFail(applicationId);

    let task = await this.productionRepo.findOne({
      where: { applicationId },
    });

    if (!task) {
      task = this.productionRepo.create({ applicationId, progressPercent: 0 });
    }

    if (dto.assignedFactory !== undefined) {
      task.assignedFactory = dto.assignedFactory;
    }
    if (dto.progressPercent !== undefined) {
      task.progressPercent = dto.progressPercent;
    }
    if (dto.startDate !== undefined) {
      task.startDate = new Date(dto.startDate);
    }
    if (dto.expectedCompletion !== undefined) {
      task.expectedCompletion = new Date(dto.expectedCompletion);
    }

    const saved = await this.productionRepo.save(task);

    return {
      message: 'Production task updated successfully.',
      productionTask: saved,
    };
  }

  private async getApplicationDetail(app: CoinApplication) {
    const [history, documents, productionTask] = await Promise.all([
      this.historyRepo.find({
        where: { applicationId: app.id },
        order: { createdAt: 'ASC' },
      }),
      this.docsRepo.find({
        where: { applicationId: app.id },
        order: { createdAt: 'DESC' },
      }),
      this.productionRepo.findOne({ where: { applicationId: app.id } }),
    ]);

    return {
      message: 'Application retrieved successfully.',
      application: app,
      statusHistory: history,
      documents,
      productionTask,
    };
  }

  private async findApplicationOrFail(id: string): Promise<CoinApplication> {
    const app = await this.appsRepo.findOne({ where: { id } });
    if (!app) {
      throw new NotFoundException(`Application "${id}" not found.`);
    }
    return app;
  }

  private async recordStatusChange(
    applicationId: string,
    fromStatus: ApplicationStatus | null,
    toStatus: ApplicationStatus,
    changedById: string,
    note: string | null,
  ) {
    await this.historyRepo.save(
      this.historyRepo.create({
        applicationId,
        fromStatus,
        toStatus,
        changedById,
        note,
      }),
    );
  }
}
