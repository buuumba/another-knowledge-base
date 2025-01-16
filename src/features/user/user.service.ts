import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Репозиторий для работы с пользователями
  ) {}

  // Создание нового пользователя с хешированием пароля
  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      email: createUserDto.email,
      password: hashedPassword,
    });
    return this.userRepository.save(user); // Сохранение пользователя в базе данных
  }

  // Получение списка всех пользователей
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Получение одного пользователя по ID
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found'); // Исключение, если пользователь не найден
    }
    return user;
  }

  // Поиск пользователя по email
  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  // Обновление данных пользователя
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    Object.assign(user, updateUserDto); // Обновление полей пользователя
    return this.userRepository.save(user); // Сохранение изменений
  }

  // Удаление пользователя
  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
