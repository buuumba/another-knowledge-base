import { Module } from '@nestjs/common';
import { ArticleService } from './features/article/article.service';
import { ArticleModule } from './features/article/article.module';
import { UserService } from './features/user/user.service';
import { UserController } from './features/user/user.controller';
import { UserModule } from './features/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
