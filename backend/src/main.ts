import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Purrfect Creations')
    .setDescription('Purrfect creations API docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => {
    Logger.log(`Server running on http://localhost:${PORT}`, 'Bootstrap');
  });
}
bootstrap();
