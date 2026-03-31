"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const public_decorator_1 = require("./decorators/public.decorator");
const current_user_decorator_1 = require("./decorators/current-user.decorator");
const user_entity_1 = require("@/users/entity/user.entity");
const jwt_refresh_guard_1 = require("./guards/jwt-refresh.guard");
const api_response_dto_1 = require("@/common/dto/api-response.dto");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async login(dto, ip, req) {
        const userAgent = req.headers['user-agent'] || '';
        const data = await this.authService.login(dto, ip, userAgent);
        return new api_response_dto_1.ApiResponseDto(true, 'Login successful', data);
    }
    async refresh(user, req) {
        const token = req.get('Authorization');
        if (!token)
            throw new common_1.UnauthorizedException('Authorization header not found');
        const refreshToken = token.replace('Bearer', '').trim();
        const data = await this.authService.refreshToken(user, refreshToken);
        return new api_response_dto_1.ApiResponseDto(true, 'Token refreshed successfully', data);
    }
    async logout(req) {
        const token = req.get('Authorization');
        if (!token)
            throw new common_1.UnauthorizedException('Authorization header not found');
        const refreshToken = token.replace('Bearer', '').trim();
        await this.authService.logout(refreshToken);
        return new api_response_dto_1.ApiResponseDto(true, 'Logout successful');
    }
    async me(user) {
        const data = await this.authService.getMe(user);
        return new api_response_dto_1.ApiResponseDto(true, 'User profile retrieved', data);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: 'User login' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Login successful, tokens returned.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Invalid credentials.' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Ip)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, String, Object]),
    __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], AuthController.prototype, "login", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.UseGuards)(jwt_refresh_guard_1.JwtRefreshGuard),
    (0, common_1.Post)('refresh'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Refresh access token' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Token refreshed successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.UseGuards)(jwt_refresh_guard_1.JwtRefreshGuard),
    (0, common_1.Post)('logout'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'User logout — pass the refresh token as Bearer' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Logout successful.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get current authenticated user profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User profile retrieved.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], AuthController.prototype, "me", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map