import { ConfigService } from '@nestjs/config';
import { UsersService } from '@/users/users.service';
declare const JwtStrategy_base: any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    private readonly usersService;
    constructor(configService: ConfigService, usersService: UsersService);
    validate(payload: {
        sub: string;
        email: string;
    }): unknown;
}
export {};
