import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔥 Active le parsing JSON
  app.use(express.json());

  // 🔥 Active CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // 🔥 Utilise le port fourni par Render
  await app.listen(process.env.PORT || 3000);

  console.log(`🚀 Backend running on port ${process.env.PORT || 3000}`);
}

bootstrap();
