import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column('simple-array')
  tags: string[];

  @Column({ default: false })
  isPublic: boolean;

  @ManyToOne(() => User, (user) => user.articles)
  user: User;
}
