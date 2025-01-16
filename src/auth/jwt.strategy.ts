import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Токен извлекается из заголовка Authorization
      ignoreExpiration: false, // Токен недействителен, если истёк срок действия
      secretOrKey: process.env.JWT_SECRET || 'secretKey', // Секретный ключ для проверки подписи токена
    });
  }

  // Метод validate вызывается для каждого валидного токена
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
