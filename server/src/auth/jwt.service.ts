import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { KEY } from 'secret';

@Injectable()
export class JwtService {
    async generate(payload: any) {
        return sign(payload, KEY, { expiresIn: '23h' }); // returns the token
    }
}
