import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Включение глобальной валидации
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Удаляет поля, отсутствующие в DTO
      forbidNonWhitelisted: true, // Вызывает ошибку при наличии неразрешённых полей
      transform: true, // Автоматически преобразует типы
    }),
  );

  await app.listen(3000);
}
bootstrap();
