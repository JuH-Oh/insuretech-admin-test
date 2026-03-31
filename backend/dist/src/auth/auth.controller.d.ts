import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { User } from '@/users/entity/user.entity';
import type { Request } from 'express';
import { TokenDto } from './dto/token.dto';
import { ApiResponseDto } from '@/common/dto/api-response.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginDto, ip: string, req: Request): Promise<ApiResponseDto<TokenDto>>;
    refresh(user: User, req: Request): Promise<ApiResponseDto<TokenDto>>;
    logout(req: Request): Promise<ApiResponseDto<null>>;
    me(user: User): Promise<ApiResponseDto<User>>;
}
