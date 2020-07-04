import { Controller, Post, Body } from '@nestjs/common';
import { Register, Login } from './authdto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('register')
    async register(@Body() user: Register) {
        await this.authService.register(user);
    }

    @Post('login')
    async login(@Body() user: Login) {
        await this.authService.login(user);
    }
}
