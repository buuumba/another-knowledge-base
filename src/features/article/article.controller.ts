import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Patch,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // Создание статьи доступно только авторизованным пользователям
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  // Получение всех публичных статей, с возможностью фильтрации по тегам и с учётом авторизации
  @Get()
  // Получение всех статей
  async findAll(@Req() req: Request, @Query('tags') tags: string[]) {
    const isAuthenticated = !!req.user; // Проверка авторизованности
    return this.articleService.findAll(isAuthenticated, tags);
  }

  // Получение одной статьи с учётом авторизации
  @Get(':id')
  async findOne(@Req() req: Request, @Param('id') id: number) {
    const isAuthenticated = !!req.user; // Проверка авторизованности
    return this.articleService.findOne(id, isAuthenticated);
  }

  // Обновление статьи доступно только авторизованным пользователям
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(id, updateArticleDto);
  }

  // Удаление статьи доступно только авторизованным пользователям
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.articleService.remove(id);
  }
}
