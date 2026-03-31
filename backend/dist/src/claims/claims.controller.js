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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const claims_service_1 = require("./claims.service");
const api_response_dto_1 = require("@/common/dto/api-response.dto");
const public_decorator_1 = require("@/auth/decorators/public.decorator");
const current_user_decorator_1 = require("@/auth/decorators/current-user.decorator");
const user_entity_1 = require("@/users/entity/user.entity");
const list_claims_dto_1 = require("./dto/list-claims.dto");
const update_estimation_item_dto_1 = require("./dto/update-estimation-item.dto");
const create_approval_dto_1 = require("./dto/create-approval.dto");
const claims_response_dto_1 = require("./dto/claims-response.dto");
let ClaimsController = class ClaimsController {
    claimsService;
    constructor(claimsService) {
        this.claimsService = claimsService;
    }
    getClaimTypes() {
        return new api_response_dto_1.ApiResponseDto(true, 'Claim types retrieved successfully', this.claimsService.getClaimTypes());
    }
    getClaimStatuses() {
        return new api_response_dto_1.ApiResponseDto(true, 'Claim statuses retrieved successfully', this.claimsService.getClaimStatuses());
    }
    async findAll(dto) {
        const data = await this.claimsService.findAll(dto);
        return new api_response_dto_1.ApiResponseDto(true, 'Claims retrieved successfully', data);
    }
    async findOne(id) {
        const data = await this.claimsService.findOne(id);
        return new api_response_dto_1.ApiResponseDto(true, 'Claim retrieved successfully', data);
    }
    async getEstimation(id) {
        const data = await this.claimsService.findEstimation(id);
        return new api_response_dto_1.ApiResponseDto(true, 'Estimation retrieved successfully', data);
    }
    async updateEstimationItem(id, itemId, dto) {
        const data = await this.claimsService.updateEstimationItem(id, itemId, dto);
        return new api_response_dto_1.ApiResponseDto(true, 'Estimation item updated successfully', data);
    }
    async createApproval(id, dto, user) {
        const data = await this.claimsService.createApproval(id, dto, user);
        return new api_response_dto_1.ApiResponseDto(true, 'Approval created successfully', data);
    }
};
exports.ClaimsController = ClaimsController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('types'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all claim types with labels' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Claim types retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", api_response_dto_1.ApiResponseDto)
], ClaimsController.prototype, "getClaimTypes", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('statuses'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all claim statuses with labels' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Claim statuses retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", api_response_dto_1.ApiResponseDto)
], ClaimsController.prototype, "getClaimStatuses", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get paginated list of claims with optional filters' }),
    (0, swagger_1.ApiQuery)({ name: 'type', required: false, enum: ['A', 'B', 'C'], description: 'Filter by claim type' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: ['wait', 'done', 'sent', 'transfer', 'paid'], description: 'Filter by claim status' }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, type: String, description: 'Search by complex name, claim id, or description' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Claims retrieved successfully', type: claims_response_dto_1.ClaimListResponseDto }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_claims_dto_1.ListClaimsDto]),
    __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], ClaimsController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get claim detail by ID including photos, AI reasons, events, and type-specific details' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'Claim ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Claim retrieved successfully', type: claims_response_dto_1.ClaimDetailResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Claim not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], ClaimsController.prototype, "findOne", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id/estimation'),
    (0, swagger_1.ApiOperation)({ summary: 'Get estimation with items for a specific claim' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'Claim ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Estimation retrieved successfully', type: claims_response_dto_1.EstimationResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Estimation not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ClaimsController.prototype, "getEstimation", null);
__decorate([
    (0, common_1.Patch)(':id/estimation/items/:itemId'),
    (0, swagger_1.ApiOperation)({ summary: 'Update isSelected status of an estimation item' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'Claim ID' }),
    (0, swagger_1.ApiParam)({ name: 'itemId', type: Number, description: 'Estimation item ID' }),
    (0, swagger_1.ApiBody)({ type: update_estimation_item_dto_1.UpdateEstimationItemDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Estimation item updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Claim or estimation item not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('itemId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, update_estimation_item_dto_1.UpdateEstimationItemDto]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ClaimsController.prototype, "updateEstimationItem", null);
__decorate([
    (0, common_1.Post)(':id/approvals'),
    (0, swagger_1.ApiOperation)({ summary: 'Create an approval decision for a claim' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'Claim ID' }),
    (0, swagger_1.ApiBody)({ type: create_approval_dto_1.CreateApprovalDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Approval created successfully', type: claims_response_dto_1.ApprovalResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Claim not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_approval_dto_1.CreateApprovalDto,
        user_entity_1.User]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], ClaimsController.prototype, "createApproval", null);
exports.ClaimsController = ClaimsController = __decorate([
    (0, swagger_1.ApiTags)('Claims'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('claims'),
    __metadata("design:paramtypes", [claims_service_1.ClaimsService])
], ClaimsController);
//# sourceMappingURL=claims.controller.js.map