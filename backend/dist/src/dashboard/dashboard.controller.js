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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dashboard_service_1 = require("./dashboard.service");
const api_response_dto_1 = require("@/common/dto/api-response.dto");
const public_decorator_1 = require("@/auth/decorators/public.decorator");
const kpi_response_dto_1 = require("./dto/kpi-response.dto");
let DashboardController = class DashboardController {
    dashboardService;
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    async getKpi() {
        const data = await this.dashboardService.getMonthlyKpi();
        return new api_response_dto_1.ApiResponseDto(true, 'KPI retrieved successfully', data);
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('kpi'),
    (0, swagger_1.ApiOperation)({ summary: 'Get monthly KPI metrics for the current month' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'KPI retrieved successfully', type: kpi_response_dto_1.KpiResponseDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], DashboardController.prototype, "getKpi", null);
exports.DashboardController = DashboardController = __decorate([
    (0, swagger_1.ApiTags)('Dashboard'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('dashboard'),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
], DashboardController);
//# sourceMappingURL=dashboard.controller.js.map