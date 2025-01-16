import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  // Создание новой статьи
  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const article = this.articleRepository.create(createArticleDto);
    return this.articleRepository.save(article); // Сохранение статьи в базе данных
  }

  // Получение списка всех публичных статей, с возможностью фильтрации по тегам
  async findAll(filterTags?: string[]): Promise<Article[]> {
    const query = this.articleRepository.createQueryBuilder('article');

    if (filterTags) {
      query.andWhere(':tag = ANY(article.tags)', { tag: filterTags }); // Фильтрация по тегам
    }

    query.andWhere('article.isPublic = :isPublic', { isPublic: true }); // Фильтрация только публичных статей

    return query.getMany(); // Выполнение запроса и возврат результатов
  }

  // Получение одной статьи по ID
  async findOne(id: number): Promise<Article> {
    const article = await this.articleRepository.findOne({ where: { id } });
    if (!article) {
      throw new NotFoundException('Article not found'); // Исключение, если статья не найдена
    }
    return article;
  }

  // Обновление существующей статьи
  async update(
    id: number,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    await this.articleRepository.update(id, updateArticleDto); // Частичное обновление статьи
    return this.findOne(id); // Возврат обновлённой статьи
  }

  // Удаление статьи
  async remove(id: number): Promise<void> {
    await this.articleRepository.delete(id); // Удаление статьи из базы данных
  }
}
