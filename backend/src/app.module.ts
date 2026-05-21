import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from './modules/auth/guards/roles.guard';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AdminModule } from './modules/admin/admin.module';
import { CatalogModule } from './modules/catalog/catalog.module';
import { CoinsModule } from './modules/coins/coins.module';
import { InvestmentsModule } from './modules/investments/investments.module';
import { MetalsModule } from './modules/metals/metals.module';
import { AuditModule } from './modules/audit/audit.module';
import { RefreshToken } from './modules/auth/entities/refresh-token.entity';
import { User } from './modules/users/entities/user.entity';
import { Brand } from './modules/catalog/entities/brand.entity';
import { Category } from './modules/catalog/entities/category.entity';
import { Product } from './modules/catalog/entities/product.entity';
import { CoinApplication } from './modules/coins/entities/coin-application.entity';
import { ApplicationStatusHistory } from './modules/coins/entities/application-status-history.entity';
import { ApplicationDocument } from './modules/coins/entities/application-document.entity';
import { ProductionTask } from './modules/coins/entities/production-task.entity';
import { Investment } from './modules/investments/entities/investment.entity';
import { MetalPrice } from './modules/metals/entities/metal-price.entity';
import { AuditLog } from './modules/audit/entities/audit-log.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, jwtConfig],
      envFilePath: '.env',
    }),

    ThrottlerModule.forRoot([
      { name: 'short', ttl: 1_000, limit: 10 },
      { name: 'medium', ttl: 10_000, limit: 50 },
      { name: 'long', ttl: 60_000, limit: 200 },
    ]),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('database.host'),
        port: config.get<number>('database.port'),
        username: config.get<string>('database.username'),
        password: config.get<string>('database.password'),
        database: config.get<string>('database.name'),
        entities: [
          User,
          RefreshToken,
          Brand,
          Category,
          Product,
          CoinApplication,
          ApplicationStatusHistory,
          ApplicationDocument,
          ProductionTask,
          Investment,
          MetalPrice,
          AuditLog,
        ],
        synchronize: config.get<string>('app.nodeEnv') !== 'production',
        logging: config.get<string>('app.nodeEnv') === 'development',
        ssl: config.get<boolean>('database.ssl')
          ? { rejectUnauthorized: false }
          : false,
      }),
    }),

    AuditModule,
    AuthModule,
    UsersModule,
    AdminModule,
    CatalogModule,
    CoinsModule,
    InvestmentsModule,
    MetalsModule,
  ],
  providers: [
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
