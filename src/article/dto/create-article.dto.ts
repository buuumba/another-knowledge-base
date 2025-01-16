import {
  IsString,
  IsArray,
  IsBoolean,
  IsOptional,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateArticleDto {
  @IsString()
  title: string; // Заголовок статьи

  @IsString()
  content: string; // Содержание статьи

  @IsArray()
  @ArrayNotEmpty() // Проверяет, что массив не пустой
  @IsString({ each: true }) // Проверяет, что каждый элемент массива — строка
  tags: string[];

  @IsBoolean()
  @IsOptional() // Если поле не указано, оно будет считаться `false` по умолчанию
  isPublic?: boolean;

  @IsOptional() // Указывается, если нужно явно связать статью с пользователем
  userId?: number;
}
