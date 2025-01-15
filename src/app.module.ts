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
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: +process.env.DB_PORT || 5432,
      username: process.env.DB_USERNAME || 'your_username',
      password: process.env.DB_PASSWORD || 'your_password',
      database: process.env.DB_DATABASE || 'knowledge_base',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    ArticleModule,
    AuthModule,
  ],
})
export class AppModule {}
