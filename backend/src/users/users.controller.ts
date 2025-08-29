import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get()
  async getUsers() {
    return await this.service.findUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: number) {
    try {
      const user = await this.service.findUser(id);
      if (!user) {
        throw new HttpException('User not found', 404);
      }
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new HttpException('Internal server error', 500);
    }
  }

  @Post()
  async createUser(@Body() data: Partial<Users>) {
    return await this.service.insertUser(data);
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() data: Partial<Users>) {
    try {
      return await this.service.editUser(id, data);
    } catch (error) {
      const err = error as Error;
      if (err.message === 'user_not_found') {
        throw new HttpException('User not found', 404);
      }
      console.error('Error updating user:', error);
      throw new HttpException('Internal server error', 500);
    }
  }

  @Delete(':id')
  async removeUser(@Param('id') id: number) {
    try {
      return await this.service.deleteUser(id);
    } catch (error) {
      const err = error as Error;
      if (err.message === 'user_not_found') {
        throw new HttpException('User not found', 404);
      }
      console.error('Error updating user:', error);
      throw new HttpException('Internal server error', 500);
    }
  }
}
