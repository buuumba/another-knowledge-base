import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number; // Уникальный идентификатор статьи

  @Index({ unique: false }) // Добавляем BTREE индекс
  @Column()
  title: string; // Заголовок статьи

  @Column('text')
  content: string; // Содержимое статьи

  @Column('simple-array')
  tags: string[]; // Массив тегов, сохранённый в виде строки

  @Column({ default: false })
  isPublic: boolean; // Флаг публичности статьи

  @ManyToOne(() => User, (user) => user.articles)
  user: User; // Связь многие-к-одному с пользователем

  @CreateDateColumn({ type: 'timestamp' }) // Дата создания
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' }) // Дата последнего обновления
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true }) // Дата софт-удаления
  deleted_at?: Date;
}
