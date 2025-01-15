import { IsString, IsArray, IsBoolean, IsOptional } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsArray()
  tags: string[];

  @IsBoolean()
  @IsOptional() // Если поле не указано, оно будет считаться `false` по умолчанию
  isPublic?: boolean;

  @IsOptional() // Указывается, если нужно явно связать статью с пользователем
  userId?: number;
}
