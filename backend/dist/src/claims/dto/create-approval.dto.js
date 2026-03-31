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
exports.CreateApprovalDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const approval_entity_1 = require("@/approvals/entity/approval.entity");
class CreateApprovalDto {
    decision;
    approvedAmount;
    comment;
}
exports.CreateApprovalDto = CreateApprovalDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Approval decision', enum: approval_entity_1.Decision, example: approval_entity_1.Decision.APPROVE }),
    (0, class_validator_1.IsEnum)(approval_entity_1.Decision),
    __metadata("design:type", String)
], CreateApprovalDto.prototype, "decision", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Approved amount (required for approve/modify)', type: Number, example: 5000000 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateApprovalDto.prototype, "approvedAmount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Comment or reason for the decision', type: String, example: 'Approved after review' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateApprovalDto.prototype, "comment", void 0);
//# sourceMappingURL=create-approval.dto.js.map