import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/getAll')
  async findAllUsers(@Req() req: any, @Res() res: any) {
    try {
      const users = await this.userService.findAll();
      res.json({ users, total: users.length });
    } catch (err) {
      throw err;
    }
  }

  @Get('/getUser/:userId')
  async findUser(
    @Req() req: any,
    @Res() res: any,
    @Param('userId') userId: string,
  ) {
    try {
      const users = await this.userService.findUser(userId);
      res.json(users);
    } catch (err) {
      throw err;
    }
  }

  @Post('/createUser')
  async createUser(
    @Req() req: any,
    @Res() res: any,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    userData: CreateUserDto,
  ) {
    try {
      const users = await this.userService.createUser(userData);
      res.json(users);
    } catch (err) {
      throw err;
    }
  }

  @Patch('/updateUser/:id')
  async updateUser(
    @Req() req: any,
    @Res() res: any,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    userData: UpdateUserDto,
    @Param('id') userId: string,
  ) {
    try {
      const users = await this.userService.updateUserData(userId, userData);
      res.json(users);
    } catch (err) {
      throw err;
    }
  }

  @Delete('/deleteUser')
  async deleteUser(
    @Req() req: any,
    @Res() res: any,
    @Body('userId') userId: string,
  ) {
    try {
      const users = await this.userService.deleteUser(userId);
      res.json(users);
    } catch (err) {
      throw err;
    }
  }
}
