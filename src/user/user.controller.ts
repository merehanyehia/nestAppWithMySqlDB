import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/getAll')
  async findAllUsers(@Req() req: any, @Res() res: any) {
    try {
      const users = await this.userService.findAll();
      res.json(users);
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
}
