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
exports.DocumentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const document_entity_1 = require("./entity/document.entity");
let DocumentsService = class DocumentsService {
    documentRepository;
    constructor(documentRepository) {
        this.documentRepository = documentRepository;
    }
    async findAll(dto) {
        const { claimId, docType, page = 1, limit = 10 } = dto;
        const skip = (page - 1) * limit;
        const qb = this.documentRepository
            .createQueryBuilder('document')
            .leftJoin('document.claim', 'claim')
            .leftJoin('claim.complex', 'complex')
            .select([
            'document.id',
            'document.claimId',
            'document.docType',
            'document.title',
            'document.status',
            'document.fileUrl',
            'document.createdAt',
            'claim.id',
            'complex.name',
        ])
            .where('document.deletedAt IS NULL');
        if (claimId) {
            qb.andWhere('document.claimId = :claimId', { claimId });
        }
        if (docType) {
            qb.andWhere('document.docType = :docType', { docType });
        }
        const [rawItems, totalCount] = await qb
            .orderBy('document.createdAt', 'DESC')
            .skip(skip)
            .take(limit)
            .getManyAndCount();
        const items = rawItems.map((doc) => ({
            id: doc.id,
            claimId: doc.claimId,
            docType: doc.docType,
            title: doc.title,
            status: doc.status,
            fileUrl: doc.fileUrl,
            complexName: doc.claim?.complex?.name ?? null,
            createdAt: doc.createdAt,
        }));
        const totalPages = Math.ceil(totalCount / limit);
        return { items, totalCount, page, totalPages };
    }
    getDocTypes() {
        return [
            { value: document_entity_1.DocType.EXEMPTION_NOTICE, label: '면책 통보서' },
            { value: document_entity_1.DocType.LITIGATION_BRIEF, label: '소송 의견서' },
            { value: document_entity_1.DocType.ADJUSTMENT_OPINION, label: '손해사정 의견서' },
            { value: document_entity_1.DocType.CIVIL_RESPONSE, label: '민원 답변서' },
        ];
    }
    getDocStatuses() {
        return [
            { value: document_entity_1.DocStatus.DRAFT, label: '초안' },
            { value: document_entity_1.DocStatus.WAIT, label: '검토 대기' },
            { value: document_entity_1.DocStatus.DONE, label: '완료' },
            { value: document_entity_1.DocStatus.TRANSFER, label: '이관' },
        ];
    }
};
exports.DocumentsService = DocumentsService;
exports.DocumentsService = DocumentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(document_entity_1.Document)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], DocumentsService);
//# sourceMappingURL=documents.service.js.map