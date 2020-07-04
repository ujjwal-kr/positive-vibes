import { Injectable, HttpException, HttpStatus, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import { Register } from './authdto';

@Injectable()
export class AuthService {

    constructor(@InjectModel('Users') private readonly userModel: Model<User>){}

    async register(userDto: Register) {
       const { email } = userDto;
       const user = await this.userModel.findOne({ email });
       if (user) {
           throw new HttpException("User Exists", HttpStatus.BAD_REQUEST)
       }
       const data: Register = {
           name: userDto.name,
           email: userDto.email,
           password: userDto.password
       }
       const newUser = await this.userModel.create(data);
       return newUser;
    }

    async login(userDto) {
        return userDto;
    }
}
