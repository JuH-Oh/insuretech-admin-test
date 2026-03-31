"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const jwt_auth_guard_1 = require("./auth/guards/jwt-auth.guard");
const database_module_1 = require("./database/database.module");
const users_module_1 = require("./users/users.module");
const complexes_module_1 = require("./complexes/complexes.module");
const policies_module_1 = require("./policies/policies.module");
const claims_module_1 = require("./claims/claims.module");
const documents_module_1 = require("./documents/documents.module");
const approvals_module_1 = require("./approvals/approvals.module");
const estimations_module_1 = require("./estimations/estimations.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: [`.env.${process.env.NODE_ENV || 'local'}`, '.env'],
            }),
            database_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            complexes_module_1.ComplexesModule,
            policies_module_1.PoliciesModule,
            claims_module_1.ClaimsModule,
            documents_module_1.DocumentsModule,
            approvals_module_1.ApprovalsModule,
            estimations_module_1.EstimationsModule,
            dashboard_module_1.DashboardModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map