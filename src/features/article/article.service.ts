import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
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

  // Получение списка всех публичных статей, с возможностью фильтрации по тегам (учёт авторизации)
  async findAll(
    isAuthenticated: boolean,
    filterTags?: string[],
  ): Promise<Article[]> {
    const query = this.articleRepository.createQueryBuilder('article');

    // Если пользователь не авторизован, возвращаем только публичные статьи
    if (!isAuthenticated) {
      query.andWhere('article.isPublic = :isPublic', { isPublic: true });
    }

    // Фильтрация по тегам, если они указаны
    if (filterTags) {
      query.andWhere(':tag = ANY(article.tags)', { tag: filterTags });
    }

    return query.getMany();
  }

  // Получение одной статьи (учёт авторизации)
  async findOne(id: number, isAuthenticated: boolean): Promise<Article> {
    const article = await this.articleRepository.findOne({ where: { id } });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    // Если статья приватная, проверяем авторизованность
    if (!article.isPublic && !isAuthenticated) {
      throw new NotFoundException('Article not found');
    }

    return article;
  }

  // Обновление статьи
  async update(
    id: number,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    const article = await this.findOne(id, true); // Находим статью, доступную только авторизованным
    if (!article) {
      throw new NotFoundException('Article not found');
    }

    Object.assign(article, updateArticleDto); // Обновляем поля статьи
    return this.articleRepository.save(article); // Сохраняем изменения
  }

  // Удаление статьи с использованием soft delete
  async remove(id: number): Promise<void> {
    const article = await this.articleRepository.findOne({ where: { id } });
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    await this.articleRepository.softDelete(id); // Помечаем запись как удалённую
  }

  async restore(id: number): Promise<void> {
    const article = await this.articleRepository.findOne({
      where: { id },
      withDeleted: true,
    });
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    await this.articleRepository.restore(id); // Восстанавливаем запись
  }
}
