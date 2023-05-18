import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async insertUser(
    email: string,
    password: string,
    username: string,
    bio: string,
    image: string,
  ) {
    const newUser = new this.userModel({
      email,
      password,
      username,
      bio,
      image,
    });
    const result = await newUser.save();
    return result.id as string;
  }

  async getUsers() {
    const users = await this.userModel.find().exec();
    return users.map((user) => ({
      id: user.id,
      email: user.email,
      password: user.password,
      username: user.username,
      bio: user.bio,
      image: user.image,
    }));
  }

  async getSingleUser(userId: string) {
    const user = await this.findUser(userId);
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      username: user.username,
      bio: user.username,
      image: user.image,
    };
  }

  async updateUser(
    userId: string,
    email: string,
    password: string,
    username: string,
    bio: string,
    image: string,
  ) {
    const updatedUser = await this.findUser(userId);
    if (email) {
      updatedUser.email = email;
    }
    if (password) {
      updatedUser.password = password;
    }
    if (username) {
      updatedUser.username = username;
    }
    if (bio) {
      updatedUser.bio = bio;
    }
    if (image) {
      updatedUser.image = image;
    }
    updatedUser.save();
  }

  async deleteUser(userId: string) {
    const result = await this.userModel.deleteOne({ _id: userId }).exec();
  }

  private async findUser(id: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }
}
