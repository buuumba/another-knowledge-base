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
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // Создание статьи доступно только авторизованным пользователям
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  // Получение всех публичных статей, с возможностью фильтрации по тегам
  @Get()
  findAll(@Query('tags') tags: string[]) {
    return this.articleService.findAll(tags);
  }

  // Получение одной статьи по ID
  @Get(':id') // Доступ для всех, но только публичные статьи
  findOne(@Param('id') id: number) {
    return this.articleService.findOne(id);
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
