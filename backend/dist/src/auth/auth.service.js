"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("@/users/users.service");
const token_dto_1 = require("./dto/token.dto");
const bcrypt = __importStar(require("bcrypt"));
const user_refresh_token_entity_1 = require("./entity/user-refresh-token.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let AuthService = class AuthService {
    configService;
    jwtService;
    usersService;
    refreshTokenRepository;
    constructor(configService, jwtService, usersService, refreshTokenRepository) {
        this.configService = configService;
        this.jwtService = jwtService;
        this.usersService = usersService;
        this.refreshTokenRepository = refreshTokenRepository;
    }
    async login(dto, ipAddress, userAgent) {
        const user = await this.usersService.findByEmail(dto.email);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (!user.isActive) {
            throw new common_1.ForbiddenException('User is not active');
        }
        await this.updateLastLogin(user.id);
        return this.generateTokens(user, ipAddress, userAgent);
    }
    async refreshToken(user, refreshToken) {
        const tokenRecord = await this.refreshTokenRepository.findOne({
            where: { userId: user.id, refreshToken },
        });
        if (!tokenRecord) {
            throw new common_1.ForbiddenException('Access Denied');
        }
        const accessToken = this.generateAccessToken(user);
        return new token_dto_1.TokenDto(accessToken, refreshToken);
    }
    async logout(refreshToken) {
        const tokenRecord = await this.refreshTokenRepository.findOne({ where: { refreshToken } });
        if (tokenRecord) {
            await this.refreshTokenRepository.softDelete(tokenRecord.id);
        }
    }
    async getMe(user) {
        const me = await this.usersService.findById(user.id);
        if (!me)
            throw new common_1.NotFoundException('User not found');
        return me;
    }
    async generateTokens(user, ipAddress, userAgent) {
        const accessToken = this.generateAccessToken(user);
        const refreshToken = await this.generateAndSaveRefreshToken(user, ipAddress, userAgent);
        return new token_dto_1.TokenDto(accessToken, refreshToken);
    }
    generateAccessToken(user) {
        const payload = { sub: user.id, email: user.email };
        const expiresIn = this.parseExpiry(this.configService.get('JWT_ACCESS_EXPIRES_IN', '15m'));
        return this.jwtService.sign(payload, { expiresIn });
    }
    async generateAndSaveRefreshToken(user, ipAddress, userAgent) {
        const payload = { sub: user.id };
        const expiresInString = this.configService.get('JWT_REFRESH_EXPIRES_IN', '7d');
        const expiresInSeconds = this.parseExpiry(expiresInString);
        const expiresAt = new Date();
        expiresAt.setSeconds(expiresAt.getSeconds() + expiresInSeconds);
        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: expiresInSeconds,
        });
        const tokenRecord = this.refreshTokenRepository.create({
            userId: user.id,
            refreshToken,
            ipAddress,
            userAgent,
            expiresAt,
        });
        await this.refreshTokenRepository.save(tokenRecord);
        return refreshToken;
    }
    async updateLastLogin(userId) {
        await this.refreshTokenRepository.query(`UPDATE users SET last_login_at = $1 WHERE id = $2`, [new Date(), userId]);
    }
    parseExpiry(expiryString) {
        if (!expiryString)
            return 0;
        const unit = expiryString.slice(-1);
        const value = parseInt(expiryString.slice(0, -1));
        if (isNaN(value))
            return 0;
        switch (unit) {
            case 's': return value;
            case 'm': return value * 60;
            case 'h': return value * 60 * 60;
            case 'd': return value * 24 * 60 * 60;
            default: return 0;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, typeorm_1.InjectRepository)(user_refresh_token_entity_1.UserRefreshToken)),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object, users_service_1.UsersService, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object])
], AuthService);
//# sourceMappingURL=auth.service.js.map