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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalResponseDto = exports.EstimationResponseDto = exports.ClaimDetailResponseDto = exports.ClaimListResponseDto = exports.ClaimListDataDto = exports.ClaimListItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ClaimListItemDto {
    id;
    complexName;
    description;
    claimedAt;
    type;
    status;
    aiConfidence;
    amount;
}
exports.ClaimListItemDto = ClaimListItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Claim ID', type: String, example: 'CLM-2024-001' }),
    __metadata("design:type", String)
], ClaimListItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Complex name', type: String, example: '강남 아파트' }),
    __metadata("design:type", String)
], ClaimListItemDto.prototype, "complexName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Claim description', type: String, example: '누수 피해' }),
    __metadata("design:type", String)
], ClaimListItemDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Claimed date', type: String, example: '2024-01-15T00:00:00.000Z' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], ClaimListItemDto.prototype, "claimedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Claim type', type: String, example: 'A' }),
    __metadata("design:type", String)
], ClaimListItemDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Claim status', type: String, example: 'wait' }),
    __metadata("design:type", String)
], ClaimListItemDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'AI confidence score', type: Number, example: 0.85 }),
    __metadata("design:type", Object)
], ClaimListItemDto.prototype, "aiConfidence", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Claim amount', type: Number, example: 5000000 }),
    __metadata("design:type", Object)
], ClaimListItemDto.prototype, "amount", void 0);
class ClaimListDataDto {
    items;
    totalCount;
    page;
    totalPages;
}
exports.ClaimListDataDto = ClaimListDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'List of claims', type: [ClaimListItemDto] }),
    __metadata("design:type", Array)
], ClaimListDataDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total number of records', type: Number, example: 100 }),
    __metadata("design:type", Number)
], ClaimListDataDto.prototype, "totalCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Current page number', type: Number, example: 1 }),
    __metadata("design:type", Number)
], ClaimListDataDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total number of pages', type: Number, example: 10 }),
    __metadata("design:type", Number)
], ClaimListDataDto.prototype, "totalPages", void 0);
class ClaimListResponseDto {
    success;
    message;
    data;
}
exports.ClaimListResponseDto = ClaimListResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], ClaimListResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Claims retrieved successfully' }),
    __metadata("design:type", String)
], ClaimListResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ClaimListDataDto }),
    __metadata("design:type", ClaimListDataDto)
], ClaimListResponseDto.prototype, "data", void 0);
class ClaimDetailResponseDto {
    success;
    message;
    data;
}
exports.ClaimDetailResponseDto = ClaimDetailResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], ClaimDetailResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Claim retrieved successfully' }),
    __metadata("design:type", String)
], ClaimDetailResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Claim detail data' }),
    __metadata("design:type", typeof (_b = typeof Record !== "undefined" && Record) === "function" ? _b : Object)
], ClaimDetailResponseDto.prototype, "data", void 0);
class EstimationResponseDto {
    success;
    message;
    data;
}
exports.EstimationResponseDto = EstimationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], EstimationResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Estimation retrieved successfully' }),
    __metadata("design:type", String)
], EstimationResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Estimation data' }),
    __metadata("design:type", typeof (_c = typeof Record !== "undefined" && Record) === "function" ? _c : Object)
], EstimationResponseDto.prototype, "data", void 0);
class ApprovalResponseDto {
    success;
    message;
    data;
}
exports.ApprovalResponseDto = ApprovalResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], ApprovalResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Approval created successfully' }),
    __metadata("design:type", String)
], ApprovalResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Approval data' }),
    __metadata("design:type", typeof (_d = typeof Record !== "undefined" && Record) === "function" ? _d : Object)
], ApprovalResponseDto.prototype, "data", void 0);
//# sourceMappingURL=claims-response.dto.js.map