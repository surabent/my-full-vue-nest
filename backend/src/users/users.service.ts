import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private repo: Repository<Users>,
  ) {}

  async findUsers(): Promise<Users[]> {
    return await this.repo.find();
  }

  async findUser(id: number) {
    return await this.repo.findOneBy({ id });
  }

  async insertUser(data: Partial<Users>) {
    const user = this.repo.create(data);
    return await this.repo.save(user);
  }

  async editUser(id: number, data: Partial<Users>) {
    const user = await this.repo.update(id, data);
    if (user.affected === 0) {
      throw new Error('user_not_found');
    }
    return user;
  }

  async deleteUser(id: number) {
    const user = await this.repo.delete(id);
    if (user.affected === 0) {
      throw new Error('user_not_found');
    }
    return await this.repo.delete(id);
  }
}
