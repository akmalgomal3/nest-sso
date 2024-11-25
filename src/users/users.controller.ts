import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateEmailDto } from './dto/users.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin', 'Executive')
  @Get()
  async findAll(@Query('name') name: string) {
    const users = await this.usersService.findAll(name);
    return {
      success: true,
      code: 200,
      data: users,
      error: null,
      meta: null,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin', 'Operator', 'Executive')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return {
      success: true,
      code: 200,
      data: user,
      error: null,
      meta: null,
    };
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return {
      success: true,
      code: 201,
      data: user,
      error: null,
      meta: null,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateEmail(
    @Param('id') id: string,
    @Body() updateEmailDto: UpdateEmailDto,
  ) {
    const user = await this.usersService.updateEmail(id, updateEmailDto);
    return {
      success: true,
      code: 200,
      data: user,
      error: null,
      meta: null,
    };
  }
}
