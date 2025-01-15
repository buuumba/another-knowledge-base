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

  @UseGuards(JwtAuthGuard) // Только авторизованные пользователи
  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @Get() // Доступ для всех, но только публичные статьи
  findAll(@Query('tags') tags: string[]) {
    return this.articleService.findAll(tags);
  }

  @Get(':id') // Доступ для всех, но только публичные статьи
  findOne(@Param('id') id: number) {
    return this.articleService.findOne(id);
  }

  @UseGuards(JwtAuthGuard) // Только авторизованные пользователи
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(id, updateArticleDto);
  }

  @UseGuards(JwtAuthGuard) // Только авторизованные пользователи
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.articleService.remove(id);
  }
}