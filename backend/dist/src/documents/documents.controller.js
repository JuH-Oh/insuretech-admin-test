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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const documents_service_1 = require("./documents.service");
const api_response_dto_1 = require("@/common/dto/api-response.dto");
const public_decorator_1 = require("@/auth/decorators/public.decorator");
const list_documents_dto_1 = require("./dto/list-documents.dto");
const documents_response_dto_1 = require("./dto/documents-response.dto");
let DocumentsController = class DocumentsController {
    documentsService;
    constructor(documentsService) {
        this.documentsService = documentsService;
    }
    getDocTypes() {
        return new api_response_dto_1.ApiResponseDto(true, 'Document types retrieved successfully', this.documentsService.getDocTypes());
    }
    getDocStatuses() {
        return new api_response_dto_1.ApiResponseDto(true, 'Document statuses retrieved successfully', this.documentsService.getDocStatuses());
    }
    async findAll(dto) {
        const data = await this.documentsService.findAll(dto);
        return new api_response_dto_1.ApiResponseDto(true, 'Documents retrieved successfully', data);
    }
};
exports.DocumentsController = DocumentsController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('types'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all document types with labels' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Document types retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", api_response_dto_1.ApiResponseDto)
], DocumentsController.prototype, "getDocTypes", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('statuses'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all document statuses with labels' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Document statuses retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", api_response_dto_1.ApiResponseDto)
], DocumentsController.prototype, "getDocStatuses", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get paginated list of documents with optional filters' }),
    (0, swagger_1.ApiQuery)({ name: 'claimId', required: false, type: String, description: 'Filter by claim ID' }),
    (0, swagger_1.ApiQuery)({ name: 'docType', required: false, enum: ['exemption_notice', 'litigation_brief', 'adjustment_opinion', 'civil_response'], description: 'Filter by document type' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Documents retrieved successfully', type: documents_response_dto_1.DocumentListResponseDto }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_documents_dto_1.ListDocumentsDto]),
    __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], DocumentsController.prototype, "findAll", null);
exports.DocumentsController = DocumentsController = __decorate([
    (0, swagger_1.ApiTags)('Documents'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('documents'),
    __metadata("design:paramtypes", [documents_service_1.DocumentsService])
], DocumentsController);
//# sourceMappingURL=documents.controller.js.map