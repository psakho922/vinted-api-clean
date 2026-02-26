import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔥 Active CORS pour permettre au frontend d'appeler le backend
  app.enableCors({
    origin: '*', // autorise toutes les origines (ok pour dev)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // ⚠️ Important pour Render (utilise le PORT fourni par l'environnement)
  await app.listen(process.env.PORT || 3000);

  console.log(`🚀 Backend running on port ${process.env.PORT || 3000}`);
}

bootstrap();
