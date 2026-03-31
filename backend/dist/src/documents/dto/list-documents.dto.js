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
exports.ListDocumentsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const document_entity_1 = require("../entity/document.entity");
const pagination_dto_1 = require("@/common/dto/pagination.dto");
class ListDocumentsDto extends pagination_dto_1.PaginationDto {
    claimId;
    docType;
}
exports.ListDocumentsDto = ListDocumentsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by claim ID', type: String, example: 'CLM-2024-001' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ListDocumentsDto.prototype, "claimId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by document type', enum: document_entity_1.DocType, example: document_entity_1.DocType.EXEMPTION_NOTICE }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(document_entity_1.DocType),
    __metadata("design:type", String)
], ListDocumentsDto.prototype, "docType", void 0);
//# sourceMappingURL=list-documents.dto.js.map