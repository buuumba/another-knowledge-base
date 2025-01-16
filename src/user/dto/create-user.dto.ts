import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail() // Проверяет, что переданное значение является валидным email
  email: string; // Email пользователя (обязательное поле, должно быть уникальным)

  @IsString() // Проверяет, что содержимое статьи является строкой
  @MinLength(6) // Проверяет, что длина пароля не меньше 6 символов
  password: string; // Пароль пользователя (обязательное поле)

  @IsString()
  fullName: string; // Дополнительное поле для имени пользователя
}
