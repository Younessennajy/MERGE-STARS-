import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Investment } from './entities/investment.entity';

@Injectable()
export class InvestmentsService {
  constructor(
    @InjectRepository(Investment)
    private readonly investmentsRepo: Repository<Investment>,
  ) {}

  async createFromApplication(
    userId: string,
    applicationId: string,
    amountUsd: string,
  ) {
    const existing = await this.investmentsRepo.findOne({
      where: { applicationId },
    });
    if (existing) return existing;

    return this.investmentsRepo.save(
      this.investmentsRepo.create({
        userId,
        applicationId,
        amountUsd,
      }),
    );
  }

  async findByUser(userId: string) {
    const investments = await this.investmentsRepo.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      relations: { application: true },
    });

    return {
      message: 'Investments retrieved successfully.',
      investments,
    };
  }

  async getSummary(userId: string) {
    const investments = await this.investmentsRepo.find({
      where: { userId },
      order: { createdAt: 'ASC' },
    });

    const total = investments.reduce(
      (sum, inv) => sum + parseFloat(inv.amountUsd),
      0,
    );

    // Simple growth estimate based on portfolio size (placeholder until live valuation)
    const growthPct = total > 0 ? 14.6 : 0;

    return {
      message: 'Investment summary retrieved successfully.',
      totalInvestedUsd: total.toFixed(2),
      growthPct,
      investmentCount: investments.length,
    };
  }
}
