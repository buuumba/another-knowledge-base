import { User } from '../user/user.entity';

declare global {
  namespace Express {
    interface Request {
      user?: Partial<User>; // Поле user добавляется после успешной валидации JWT
    }
  }
}
