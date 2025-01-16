import { Module } from '@nestjs/common';
import { ArticleService } from './article/article.service';
import { ArticleModule } from './article/article.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Метод validate вызывается для каждого валидного токена
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST, // Хост базы данных
      port: +process.env.DB_PORT, // Порт базы данных
      username: process.env.DB_USERNAME, // Пользователь базы данных
      password: process.env.DB_PASSWORD, // Пароль базы данных
      database: process.env.DB_DATABASE, // Имя базы данных
      synchronize: true, // Автоматическое обновление схемы базы данных (только для разработки)
    }),
    UserModule,
    ArticleModule,
    AuthModule,
  ],
})
export class AppModule {}
