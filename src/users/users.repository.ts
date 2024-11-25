import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/users.dto';
import { createUser } from '../sql/create-user.queries';
import { getUserByName } from '../sql/get-user-by-username.queries';
import { getUserById } from '../sql/get-user-by-id.queries';
import { updateUserEmail } from '../sql/update-user-email.queries';
import { findUserByEmail } from '../sql/find-user-by-email.queries';
import { saveLoginLogUser } from '../sql/save-login-log.queries';

@Injectable()
export class UsersRepository {
  private dbPool: Pool;

  constructor(private configService: ConfigService) {
    this.dbPool = new Pool({
      user: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASSWORD'),
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      database: this.configService.get<string>('DB_NAME'),
    });
  }

  async createUser(user: CreateUserDto & { password: string }) {
    const result = await createUser.run(
      {
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
      },
      this.dbPool,
    );
    return result[0];
  }

  async findAllUsers(name?: string) {
    return await getUserByName.run({ name: name }, this.dbPool);
  }

  async findUserById(id: string) {
    const result = await getUserById.run({ id: id }, this.dbPool);
    return result[0];
  }

  async updateUserEmail(id: string, email: string) {
    const result = await updateUserEmail.run(
      { id: id, email: email },
      this.dbPool,
    );
    return result[0];
  }

  async findByEmail(email: string) {
    const result = await findUserByEmail.run({ email: email }, this.dbPool);
    return result[0];
  }

  async saveLoginLogUser(
    userId: string,
    ip: string,
    latitude?: number,
    longitude?: number,
  ) {
    const result = await saveLoginLogUser.run(
      { userId, ipAddress: ip, latitude, longitude },
      this.dbPool,
    );
    return result[0];
  }
}
