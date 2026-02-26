import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ CORS correct pour frontend Render
  app.enableCors({
    origin: 'https://vinted-web.onrender.com',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
    credentials: false,
  });

  await app.listen(process.env.PORT || 3000);

  console.log(`🚀 Backend running on port ${process.env.PORT || 3000}`);
}

bootstrap();
