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
import { RefreshToken } from './modules/auth/entities/refresh-token.entity';
import { User } from './modules/users/entities/user.entity';

@Module({
  imports: [
    // ── Config ──────────────────────────────────────────────────────────────
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, jwtConfig],
      envFilePath: '.env',
    }),

    // ── Rate limiting (global) ───────────────────────────────────────────────
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1_000,
        limit: 10,
      },
      {
        name: 'medium',
        ttl: 10_000,
        limit: 50,
      },
      {
        name: 'long',
        ttl: 60_000,
        limit: 200,
      },
    ]),

    // ── Database ─────────────────────────────────────────────────────────────
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('database.host'),
        port: config.get<number>('database.port'),
        username: config.get<string>('database.username'),
        password: config.get<string>('database.password'),
        database: config.get<string>('database.name'),
        entities: [User, RefreshToken],
        synchronize: config.get<string>('app.nodeEnv') !== 'production',
        logging: config.get<string>('app.nodeEnv') === 'development',
        ssl: config.get<boolean>('database.ssl')
          ? { rejectUnauthorized: false }
          : false,
      }),
    }),

    // ── Feature modules ───────────────────────────────────────────────────────
    AuthModule,
    UsersModule,
    AdminModule,
  ],
  providers: [
    // Global exception filter
    { provide: APP_FILTER, useClass: HttpExceptionFilter },

    // Global response envelope
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },

    // Global rate-limit guard
    { provide: APP_GUARD, useClass: ThrottlerGuard },

    // Global JWT guard — routes opt-out with @Public()
    { provide: APP_GUARD, useClass: JwtAuthGuard },

    // Global roles guard — routes use @Roles() to require specific roles
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
