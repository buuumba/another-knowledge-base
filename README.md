# Another Knowledge Base

Another Knowledge Base — это REST API сервис для управления статьями базы знаний с поддержкой пользователей, авторизации и разграничения прав доступа.

## Особенности

Check out a few resources that may come in handy when working with NestJS:

- Управление статьями (создание, чтение, обновление, удаление).
  -Фильтрация статей по тегам.
- Управление пользователями.
- Авторизация с использованием JWT.
- Контроль доступа: публичные и внутренние статьи.
- Хранение данных в PostgreSQL.

## Требования

- Node.js (версия 16+)
- npm (версия 7+)
- Docker и Docker Compose

## Project setup

### Склонируйте репозиторий

```bash
$ git clone https://github.com/your-repo/another-knowledge-base.git
cd another-knowledge-base
```

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Использование

После запуска API доступны следующие маршруты:

### Статьи

- POST /article — Создание статьи (требуется авторизация).
- GET /article — Получение всех публичных статей (с поддержкой фильтрации по тегам).
- GET /article/:id — Получение одной статьи по ID.
- PATCH /article/:id — Обновление статьи (требуется авторизация).
- DELETE /article/:id — Удаление статьи (требуется авторизация).

### Использование

- POST /auth/register — Регистрация пользователя.
- POST /auth/login — Авторизация пользователя.
- GET /auth/me — Получение текущего пользователя (требуется авторизация).

## Структура проекта

```plaintext
src/
├── features/
│   ├── article/
│   │   ├── entities/
│   │   │   ├── article.entity.ts
│   │   ├── article.controller.ts
│   │   ├── article.module.ts
│   │   ├── article.service.ts
│   ├── user/
│       ├── entities/
│       │   ├── user.entity.ts
│       ├── user.controller.ts
│       ├── user.module.ts
│       ├── user.service.ts
├── auth/
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── jwt-auth.guard.ts
│   ├── jwt.strategy.ts
├── main.ts

```

## Возможные проблемы

### Ошибка: getaddrinfo ENOTFOUND postgres

- Убедитесь, что сервис базы данных PostgreSQL доступен по имени postgres.
- Проверьте настройки в файле .env.

### Ошибка подключения к базе данных

- Проверьте, что база данных запущена и доступна по указанным параметрам.

# TODO

- Добавить миграции
- Добавить логирование
- Добавить ExceptionFilter
- Добавление конфигов (https://docs.nestjs.com/techniques/configuration#custom-configuration-files
  https://docs.nestjs.com/techniques/configuration#using-the-configservice
  )
- GIN index на title
- Реализация на другой ORM (например Prisma)
- Добавить Swagger для документации API (@nestjs/swagger)
- Реализовать хэширование паролей с солью (через bcrypt)
- Добавление тестов (Юнит-тесты для сервисов и контроллеров.Интеграционные тесты для маршрутов API на jest)
