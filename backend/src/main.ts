import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });

  const config = app.get(ConfigService);
  const port = config.get<number>('app.port') ?? 3000;
  const frontendUrl = config.get<string>('app.frontendUrl') ?? '';
  const isProd = config.get<string>('app.nodeEnv') === 'production';

  // ── Security middleware ──────────────────────────────────────────────────────
  app.use(
    helmet({
      // Swagger UI needs inline scripts/styles in development
      contentSecurityPolicy: isProd ? undefined : false,
    }),
  );
  app.use(cookieParser());

  app.enableCors({
    origin: isProd ? [frontendUrl] : true,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // ── Global prefix ────────────────────────────────────────────────────────────
  app.setGlobalPrefix('api');

  // ── Global validation pipe ───────────────────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // ── Swagger (OpenAPI) ────────────────────────────────────────────────────────
  setupSwagger(app);

  // ── Graceful shutdown ────────────────────────────────────────────────────────
  app.enableShutdownHooks();

  await app.listen(port);
  console.log(`🚀 Backend running on http://localhost:${port}/api`);
  console.log(`📚 Swagger docs at http://localhost:${port}/api/docs`);
}

bootstrap();
