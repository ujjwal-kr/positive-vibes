import { Injectable, HttpException, HttpStatus, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import { Register, Login } from './authdto';
import * as bcrypt from 'bcrypt';

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

    async login(userDto: Login) {
        const { email, password } = userDto;
        const user = await this.userModel.findOne({ email });
        if (!user)
            throw new HttpException("User does not exist", HttpStatus.NOT_FOUND)
        if (await bcrypt.compare(password, user.password)) {
            return user;
        }
        throw new HttpException("ACCESS DENIED", HttpStatus.UNAUTHORIZED)
    }
}
