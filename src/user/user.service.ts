import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userTable: Repository<User>,
  ) {}

  async findAll() {
    const users = await this.userTable.find();
    return users;
  }
  async findUser(userId: string) {
    const user = await this.userTable.findOne({ where: { id: userId } });
    return user;
  }

  async createUser(userData: CreateUserDto) {
    const user = await this.userTable.create(userData);
    return this.userTable.save(user);
  }
}
