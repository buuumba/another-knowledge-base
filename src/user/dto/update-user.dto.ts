import { IsEmail, IsOptional, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsEmail() // Проверяет, что переданное значение является валидным email
  @IsOptional() // Указывает, что поле необязательно для обновления
  email?: string; // Поле для обновления email пользователя

  @MinLength(6) // Проверяет, что длина пароля не меньше 6 символов
  @IsOptional() // Указывает, что поле необязательно для обновления
  password?: string; // Поле для обновления пароля пользователя
}
