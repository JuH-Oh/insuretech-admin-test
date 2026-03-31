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
exports.DocumentListResponseDto = exports.DocumentListDataDto = exports.DocumentListItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class DocumentListItemDto {
    id;
    claimId;
    docType;
    title;
    status;
    fileUrl;
    complexName;
    createdAt;
}
exports.DocumentListItemDto = DocumentListItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Document ID', type: String, example: 'uuid-here' }),
    __metadata("design:type", String)
], DocumentListItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Associated claim ID', type: String, example: 'CLM-2024-001' }),
    __metadata("design:type", String)
], DocumentListItemDto.prototype, "claimId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Document type', type: String, example: 'exemption_notice' }),
    __metadata("design:type", String)
], DocumentListItemDto.prototype, "docType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Document title', type: String, example: '면책 통지서' }),
    __metadata("design:type", String)
], DocumentListItemDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Document status', type: String, example: 'done' }),
    __metadata("design:type", Object)
], DocumentListItemDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'File URL', type: String, example: 'https://...' }),
    __metadata("design:type", Object)
], DocumentListItemDto.prototype, "fileUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Complex name', type: String, example: '강남 아파트' }),
    __metadata("design:type", Object)
], DocumentListItemDto.prototype, "complexName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Created date', type: String, example: '2024-01-15T00:00:00.000Z' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], DocumentListItemDto.prototype, "createdAt", void 0);
class DocumentListDataDto {
    items;
    totalCount;
    page;
    totalPages;
}
exports.DocumentListDataDto = DocumentListDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'List of documents', type: [DocumentListItemDto] }),
    __metadata("design:type", Array)
], DocumentListDataDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total number of records', type: Number, example: 50 }),
    __metadata("design:type", Number)
], DocumentListDataDto.prototype, "totalCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Current page number', type: Number, example: 1 }),
    __metadata("design:type", Number)
], DocumentListDataDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total number of pages', type: Number, example: 5 }),
    __metadata("design:type", Number)
], DocumentListDataDto.prototype, "totalPages", void 0);
class DocumentListResponseDto {
    success;
    message;
    data;
}
exports.DocumentListResponseDto = DocumentListResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], DocumentListResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Documents retrieved successfully' }),
    __metadata("design:type", String)
], DocumentListResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: DocumentListDataDto }),
    __metadata("design:type", DocumentListDataDto)
], DocumentListResponseDto.prototype, "data", void 0);
//# sourceMappingURL=documents-response.dto.js.map