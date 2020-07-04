import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    async register(user) {
        return user;
    }

    async login(user) {
        return user;
    }
}
