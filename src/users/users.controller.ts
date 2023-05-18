import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async addUser(
    @Body('email') userEmail: string,
    @Body('password') userPassword: string,
    @Body('username') userUsername: string,
    @Body('bio') userBio: string,
    @Body('image') userImage: string,
  ) {
    const generatedId = await this.usersService.insertUser(
      userEmail,
      userPassword,
      userUsername,
      userBio,
      userImage,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllUsers() {
    const users = await this.usersService.getUsers();
    return users;
  }

  @Get(':id')
  getUser(@Param('id') userId: string) {
    return this.usersService.getSingleUser(userId);
  }

  @Patch(':id')
  async updateProduct(
    @Body('id') userId: string,
    @Body('email') userEmail: string,
    @Body('password') userPassword: string,
    @Body('username') userUsername: string,
    @Body('bio') userBio: string,
    @Body('image') userImage: string,
  ) {
    await this.usersService.updateUser(
      userId,
      userEmail,
      userPassword,
      userUsername,
      userBio,
      userImage,
    );
    return null;
  }

  @Delete(':id')
  async removeUser(@Param('id') userId: string) {
    await this.usersService.deleteUser(userId);
    return null;
  }
}
