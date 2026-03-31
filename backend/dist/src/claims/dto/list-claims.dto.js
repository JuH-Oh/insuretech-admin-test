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
exports.ListClaimsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const claim_entity_1 = require("../entity/claim.entity");
const pagination_dto_1 = require("@/common/dto/pagination.dto");
class ListClaimsDto extends pagination_dto_1.PaginationDto {
    type;
    status;
    search;
}
exports.ListClaimsDto = ListClaimsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by claim type', enum: claim_entity_1.ClaimType, example: claim_entity_1.ClaimType.A }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(claim_entity_1.ClaimType),
    __metadata("design:type", String)
], ListClaimsDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by claim status', enum: claim_entity_1.ClaimStatus, example: claim_entity_1.ClaimStatus.WAIT }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(claim_entity_1.ClaimStatus),
    __metadata("design:type", String)
], ListClaimsDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Search by complex name, claim id, or description', type: String, example: '강남' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ListClaimsDto.prototype, "search", void 0);
//# sourceMappingURL=list-claims.dto.js.map