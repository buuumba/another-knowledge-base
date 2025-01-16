import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number; // Уникальный идентификатор статьи

  @Column()
  title: string; // Заголовок статьи

  @Column()
  content: string; // Содержимое статьи

  @Column('simple-array')
  tags: string[]; // Массив тегов, сохранённый в виде строки

  @Column({ default: false })
  isPublic: boolean;

  @ManyToOne(() => User, (user) => user.articles)
  user: User;
}
