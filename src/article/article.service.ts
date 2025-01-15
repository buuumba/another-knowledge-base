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

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const article = this.articleRepository.create(createArticleDto);
    return this.articleRepository.save(article);
  }

  async findAll(filterTags?: string[]): Promise<Article[]> {
    if (filterTags) {
      return this.articleRepository.find({
        where: { tags: filterTags, isPublic: true },
      });
    }
    return this.articleRepository.find({ where: { isPublic: true } });
  }

  async findOne(id: number): Promise<Article> {
    const article = await this.articleRepository.findOne(id);
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    return article;
  }

  async update(
    id: number,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    await this.articleRepository.update(id, updateArticleDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.articleRepository.delete(id);
  }
}
