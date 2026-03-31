import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
declare const JwtRefreshStrategy_base: any;
export declare class JwtRefreshStrategy extends JwtRefreshStrategy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    validate(req: Request, payload: any): {
        id: any;
        refreshToken: any;
    };
}
export {};
