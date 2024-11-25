import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private redisClient;

  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });

    this.redisClient = createClient({
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    });
    this.redisClient.connect();
  }

  async validate(req: Request, payload: any) {
    const tokenInRedis = await this.redisClient.get(`user:${payload.sub}`);

    if (!tokenInRedis) {
      throw new UnauthorizedException('Token expired or invalid');
    }
    const tokenFromHeader = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    if (tokenFromHeader !== tokenInRedis) {
      throw new UnauthorizedException('Token mismatch');
    }
    // Idle timeout implementation
    await this.redisClient.expire(`user:${payload.sub}`, 900);

    return { userId: payload.sub, role: payload.role };
  }
}
