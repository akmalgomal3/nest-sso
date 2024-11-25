import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateEmailDto } from './dto/users.dto';
import * as bcrypt from 'bcrypt';
import * as cryptoJS from 'crypto-js';
import { UsersRepository } from './users.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const cryptoSecret = this.configService.get<string>('CRYPTO_SECRET');
    const encryptedPassword = cryptoJS.AES.encrypt(
      hashedPassword,
      cryptoSecret,
    ).toString();

    return await this.usersRepository.createUser({
      ...createUserDto,
      password: encryptedPassword,
    });
  }

  async findAll(name?: string) {
    return await this.usersRepository.findAllUsers(name);
  }

  async findOne(id: string) {
    return await this.usersRepository.findUserById(id);
  }

  async updateEmail(id: string, updateEmailDto: UpdateEmailDto) {
    return await this.usersRepository.updateUserEmail(id, updateEmailDto.email);
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findByEmail(email);
  }

  async decryptPassword(encryptedPassword: string) {
    const cryptoSecret = this.configService.get<string>('CRYPTO_SECRET');
    const bytes = cryptoJS.AES.decrypt(encryptedPassword, cryptoSecret);
    return bytes.toString(cryptoJS.enc.Utf8);
  }

  async saveLoginLogUser(
    userId: string,
    ip: string,
    latitude?: number,
    longitude?: number,
  ) {
    return await this.usersRepository.saveLoginLogUser(
      userId,
      ip,
      latitude,
      longitude,
    );
  }
}
