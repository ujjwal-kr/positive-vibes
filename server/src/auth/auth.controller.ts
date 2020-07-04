import { Controller, Post, Body } from '@nestjs/common';
import { Register, Login } from './authdto';
import { AuthService } from './auth.service';
import { User } from './user.model';
import { JwtService } from './jwt.service';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
        private jwtService: JwtService
        ){}

    @Post('register')
    async register(@Body() userDto: Register) {
        return await this.authService.register(userDto);
    }

    @Post('login')
    async login(@Body() userDto: Login) {
        const user: User = await this.authService.login(userDto);
        const payload = {id: user.id}
        const token = await this.jwtService.generate(payload);
        return {user, token}
    }
}
