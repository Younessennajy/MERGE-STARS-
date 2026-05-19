import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Merge Stars API')
    .setDescription(
      'REST API for Merge Stars — authentication, users, and admin panel.',
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
    .addTag('Admin', 'Admin panel — users, roles, email & password management')
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
