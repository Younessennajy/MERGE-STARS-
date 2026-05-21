import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditModule } from '../audit/audit.module';
import { InvestmentsModule } from '../investments/investments.module';
import { MetalsModule } from '../metals/metals.module';
import { AdminApplicationsController } from './admin-applications.controller';
import { CoinsController } from './coins.controller';
import { CoinsService } from './coins.service';
import { ApplicationDocument } from './entities/application-document.entity';
import { ApplicationStatusHistory } from './entities/application-status-history.entity';
import { CoinApplication } from './entities/coin-application.entity';
import { ProductionTask } from './entities/production-task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CoinApplication,
      ApplicationStatusHistory,
      ApplicationDocument,
      ProductionTask,
    ]),
    MetalsModule,
    InvestmentsModule,
    AuditModule,
  ],
  controllers: [CoinsController, AdminApplicationsController],
  providers: [CoinsService],
  exports: [CoinsService],
})
export class CoinsModule {}
