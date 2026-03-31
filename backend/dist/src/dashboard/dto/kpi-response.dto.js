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
Object.defineProperty(exports, "__esModule", { value: true });
exports.KpiResponseDto = exports.KpiDataDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class KpiDataDto {
    totalClaims;
    typeA;
    typeB;
    typeC;
    pendingApproval;
    lossRateAb;
    lossRateC;
}
exports.KpiDataDto = KpiDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total claims for the current month', type: Number, example: 120 }),
    __metadata("design:type", Number)
], KpiDataDto.prototype, "totalClaims", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Type A claims count', type: Number, example: 45 }),
    __metadata("design:type", Number)
], KpiDataDto.prototype, "typeA", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Type B claims count', type: Number, example: 35 }),
    __metadata("design:type", Number)
], KpiDataDto.prototype, "typeB", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Type C claims count', type: Number, example: 40 }),
    __metadata("design:type", Number)
], KpiDataDto.prototype, "typeC", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Pending approval claims count', type: Number, example: 15 }),
    __metadata("design:type", Number)
], KpiDataDto.prototype, "pendingApproval", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Loss rate for Type A/B (percentage change)', type: Number, example: -16.8 }),
    __metadata("design:type", Number)
], KpiDataDto.prototype, "lossRateAb", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Loss rate for Type C (percentage change)', type: Number, example: -11.2 }),
    __metadata("design:type", Number)
], KpiDataDto.prototype, "lossRateC", void 0);
class KpiResponseDto {
    success;
    message;
    data;
}
exports.KpiResponseDto = KpiResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], KpiResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'KPI retrieved successfully' }),
    __metadata("design:type", String)
], KpiResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: KpiDataDto }),
    __metadata("design:type", KpiDataDto)
], KpiResponseDto.prototype, "data", void 0);
//# sourceMappingURL=kpi-response.dto.js.map