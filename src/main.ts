// main.ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cookieParser());

  // Enable CORS untuk FE (ganti domain sesuai host FE-mu di Railway)
  app.enableCors({
    origin: [
      'https://absen-dwidelta.up.railway.app',
      'https://student-ui.up.railway.app',
      'http://localhost:3000',
    ], // FE kamu
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  // Dengerin di PORT dari Railway (atau fallback ke 8080 pas lokal dev)
  const port = process.env.PORT || 8080;
  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}`);
}

bootstrap();
