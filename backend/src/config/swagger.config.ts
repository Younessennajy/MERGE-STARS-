import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Merge Stars API')
    .setDescription(
      'REST API for Merge Stars — auth, dashboard, coin applications, catalog, metals & admin.',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Paste the accessToken returned by POST /api/auth/login',
      },
      'access-token',
    )
    .addTag('Auth', 'Registration, login, token refresh, logout')
    .addTag('Users', 'Profile & dashboard')
    .addTag('Coins', 'Coin applications & price calculator')
    .addTag('Investments', 'User investment portfolio')
    .addTag('Metals', 'Live gold, silver, platinum, palladium prices')
    .addTag('Catalog', 'Public categories, brands & products')
    .addTag('Manager', 'Manager panel — brands, categories & products CRUD')
    .addTag('Admin', 'Admin panel — users & application workflow')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
    customSiteTitle: 'Merge Stars API Docs',
  });
}
