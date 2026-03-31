import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/users/users.service';
import { LoginDto } from './dto/login.dto';
import { TokenDto } from './dto/token.dto';
import { UserRefreshToken } from './entity/user-refresh-token.entity';
import { Repository } from 'typeorm';
import { User } from '@/users/entity/user.entity';
export declare class AuthService {
    private readonly configService;
    private readonly jwtService;
    private readonly usersService;
    private readonly refreshTokenRepository;
    constructor(configService: ConfigService, jwtService: JwtService, usersService: UsersService, refreshTokenRepository: Repository<UserRefreshToken>);
    login(dto: LoginDto, ipAddress: string, userAgent: string): Promise<TokenDto>;
    refreshToken(user: User, refreshToken: string): Promise<TokenDto>;
    logout(refreshToken: string): Promise<void>;
    getMe(user: User): Promise<User>;
    private generateTokens;
    private generateAccessToken;
    private generateAndSaveRefreshToken;
    private updateLastLogin;
    private parseExpiry;
}
