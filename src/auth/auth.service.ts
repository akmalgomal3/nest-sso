import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { createClient } from 'redis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private redisClient;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.redisClient = createClient({
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    });
    this.redisClient.connect();
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const encryptedPassword = user.password;
      const decryptedHashedPassword =
        await this.usersService.decryptPassword(encryptedPassword);
      const passwordMatch = await bcrypt.compare(pass, decryptedHashedPassword);

      if (passwordMatch) {
        return user;
      }
    }
    return null;
  }

  async login(
    user: any,
    ip: string,
    latitude?: number,
    longitude?: number,
  ): Promise<any> {
    const payload = { sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload, { expiresIn: '2h' });

    // SSO Implementation
    await this.redisClient.set(`user:${user.id}`, token, {
      EX: 900,
    });
    await this.usersService.saveLoginLogUser(user.id, ip, latitude, longitude);

    return {
      access_token: token,
    };
  }

  async logout(userId: number) {
    await this.redisClient.del(`user:${userId}`);
  }
}
