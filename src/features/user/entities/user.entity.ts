import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Article } from '../../article/entities/article.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number; // Уникальный идентификатор пользователя

  @Column({ unique: true })
  email: string; // Email пользователя (уникальный)

  @Column()
  password: string; // Хешированный пароль пользователя

  @OneToMany(() => Article, (article) => article.user)
  articles: Article[]; // Связь один-ко-многим с сущностью Article
}
