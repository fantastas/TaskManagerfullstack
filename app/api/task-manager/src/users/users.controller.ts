import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  Req,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { Response, Request } from 'express';
import { UnauthorizedException } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Get('/:email')
  public async getUser(@Param('email') email: string) {
    return await this.usersService.findOne(email);
  }

  @Get()
  public async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  @Post('register')
  public async addUser(@Res() res, @Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create(res, createUserDto);
    res.status(200).json(newUser);
  }

  @Post('login')
  public async login(
    @Body() user: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const existingUser = await this.usersService.findOne(user.email);
    if (!existingUser) {
      throw new BadRequestException('invalid credentials');
    }
    if (!(await bcrypt.compare(user.password, existingUser.password))) {
      throw new BadRequestException('invalid password');
    }
    const jwt = await this.jwtService.signAsync({ email: existingUser.email });

    response.cookie('jwt', jwt, { httpOnly: true });
    return {
      message: 'Success!',
    };
  }

  @Get('login/user')
  async user(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];
      console.log(cookie);
      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        throw new UnauthorizedException();
      }
      const user = await this.usersService.findOne(data['email']);
      const { password, ...result } = user;
      return user;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return {
      message: 'Success',
    };
  }

  @Delete()
  public async deleteUsers() {
    return await this.usersService.deleteUsers();
  }
}
