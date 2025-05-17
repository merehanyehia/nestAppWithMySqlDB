import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
    if (!user) {
      throw new NotFoundException("this user doesn't exist");
    }
    return user;
  }

  async createUser(userData: CreateUserDto) {
    const user = await this.userTable.create(userData);
    return this.userTable.save(user);
  }

  async updateUserData(userId: string, userData: UpdateUserDto) {
    const user = await this.userTable.findOne({ where: { id: userData.id } });
    if (!user) {
      throw new NotFoundException("this user doesn't exist");
    }
    return await this.userTable.save({ id: userId, ...userData });
  }

  async deleteUser(userId: string) {
    const user = await this.userTable.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException("this user doesn't exist");
    }
    await this.userTable.delete({ id: userId });
    return await this.findAll();
  }
}
