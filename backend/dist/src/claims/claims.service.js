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
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const claim_entity_1 = require("./entity/claim.entity");
const type_a_detail_entity_1 = require("./entity/type-a-detail.entity");
const type_b_detail_entity_1 = require("./entity/type-b-detail.entity");
const estimation_entity_1 = require("@/estimations/entity/estimation.entity");
const estimation_item_entity_1 = require("@/estimations/entity/estimation-item.entity");
const approval_entity_1 = require("@/approvals/entity/approval.entity");
let ClaimsService = class ClaimsService {
    claimRepository;
    typeADetailRepository;
    typeBDetailRepository;
    estimationRepository;
    estimationItemRepository;
    approvalRepository;
    dataSource;
    constructor(claimRepository, typeADetailRepository, typeBDetailRepository, estimationRepository, estimationItemRepository, approvalRepository, dataSource) {
        this.claimRepository = claimRepository;
        this.typeADetailRepository = typeADetailRepository;
        this.typeBDetailRepository = typeBDetailRepository;
        this.estimationRepository = estimationRepository;
        this.estimationItemRepository = estimationItemRepository;
        this.approvalRepository = approvalRepository;
        this.dataSource = dataSource;
    }
    async findAll(dto) {
        const { type, status, search, page = 1, limit = 10 } = dto;
        const skip = (page - 1) * limit;
        const qb = this.claimRepository
            .createQueryBuilder('claim')
            .leftJoin('claim.complex', 'complex')
            .select([
            'claim.id',
            'complex.name',
            'claim.description',
            'claim.claimedAt',
            'claim.type',
            'claim.status',
            'claim.aiConfidence',
            'claim.amount',
        ])
            .where('claim.deletedAt IS NULL');
        if (type) {
            qb.andWhere('claim.type = :type', { type });
        }
        if (status) {
            qb.andWhere('claim.status = :status', { status });
        }
        if (search) {
            qb.andWhere('(complex.name ILIKE :search OR claim.id ILIKE :search OR claim.description ILIKE :search)', { search: `%${search}%` });
        }
        const [rawItems, totalCount] = await qb
            .orderBy('claim.claimedAt', 'DESC')
            .skip(skip)
            .take(limit)
            .getManyAndCount();
        const items = rawItems.map((c) => ({
            id: c.id,
            complexName: c.complex?.name ?? null,
            description: c.description,
            claimedAt: c.claimedAt,
            type: c.type,
            status: c.status,
            aiConfidence: c.aiConfidence,
            amount: c.amount,
        }));
        const totalPages = Math.ceil(totalCount / limit);
        return { items, totalCount, page, totalPages };
    }
    async findOne(id) {
        const qb = this.claimRepository
            .createQueryBuilder('claim')
            .leftJoin('claim.complex', 'complex')
            .leftJoin('claim.policy', 'policy')
            .leftJoin('claim.assignee', 'assignee')
            .leftJoin('claim.photos', 'photo')
            .leftJoin('claim.aiReasons', 'aiReason')
            .leftJoin('claim.precedents', 'precedent')
            .leftJoin('claim.events', 'event')
            .select([
            'claim.id',
            'claim.description',
            'claim.claimedAt',
            'claim.type',
            'claim.status',
            'claim.aiConfidence',
            'claim.amount',
            'claim.claimantName',
            'complex.id',
            'complex.name',
            'complex.address',
            'complex.builder',
            'complex.builtAt',
            'complex.warrantyYr',
            'policy.id',
            'policy.policyType',
            'policy.holderName',
            'policy.validFrom',
            'policy.validUntil',
            'policy.deductible',
            'assignee.id',
            'assignee.name',
            'assignee.email',
            'assignee.role',
            'photo.id',
            'photo.label',
            'photo.fileUrl',
            'photo.sortOrder',
            'photo.annotations',
            'aiReason.id',
            'aiReason.reasonText',
            'aiReason.sortOrder',
            'precedent.id',
            'precedent.caseNumber',
            'precedent.description',
            'precedent.sortOrder',
            'event.id',
            'event.title',
            'event.eventAt',
            'event.status',
            'event.stepNumber',
            'event.sortOrder',
        ])
            .where('claim.id = :id', { id })
            .andWhere('claim.deletedAt IS NULL');
        const claim = await qb.getOne();
        if (!claim) {
            throw new common_1.NotFoundException(`Claim with id ${id} not found`);
        }
        const result = {
            id: claim.id,
            description: claim.description,
            claimedAt: claim.claimedAt,
            type: claim.type,
            status: claim.status,
            aiConfidence: claim.aiConfidence,
            amount: claim.amount,
            claimantName: claim.claimantName,
            complex: claim.complex,
            policy: claim.policy,
            assignee: claim.assignee,
            photos: claim.photos,
            aiReasons: claim.aiReasons,
            precedents: claim.precedents,
            events: claim.events,
        };
        if (claim.type === claim_entity_1.ClaimType.A) {
            const typeADetail = await this.typeADetailRepository
                .createQueryBuilder('detail')
                .select([
                'detail.claimId',
                'detail.defectType',
                'detail.warrantyRemaining',
                'detail.totalClaimEst',
                'detail.unitClaimEst',
                'detail.isExemption',
            ])
                .where('detail.claimId = :id', { id })
                .getOne();
            result.typeADetail = typeADetail ?? null;
        }
        else if (claim.type === claim_entity_1.ClaimType.B) {
            const typeBDetail = await this.typeBDetailRepository
                .createQueryBuilder('detail')
                .select([
                'detail.claimId',
                'detail.applicableClause',
                'detail.objectionDeadline',
                'detail.currentStep',
                'detail.flowSteps',
            ])
                .where('detail.claimId = :id', { id })
                .getOne();
            result.typeBDetail = typeBDetail ?? null;
        }
        else if (claim.type === claim_entity_1.ClaimType.C) {
            result.estimation = (await this.loadEstimation(id)) ?? null;
        }
        return result;
    }
    async findEstimation(claimId) {
        const estimation = await this.loadEstimation(claimId);
        if (!estimation) {
            throw new common_1.NotFoundException(`Estimation for claim ${claimId} not found`);
        }
        return estimation;
    }
    async loadEstimation(claimId) {
        return this.estimationRepository
            .createQueryBuilder('estimation')
            .leftJoin('estimation.items', 'item')
            .select([
            'estimation.claimId',
            'estimation.totalAmount',
            'estimation.calcSeconds',
            'estimation.vendorEstimate',
            'estimation.depreciation',
            'estimation.indirectRate',
            'estimation.finalAmount',
            'item.id',
            'item.name',
            'item.description',
            'item.quantity',
            'item.unit',
            'item.standardSrc',
            'item.subtotal',
            'item.isSelected',
            'item.sortOrder',
        ])
            .where('estimation.claimId = :claimId', { claimId })
            .getOne();
    }
    async updateEstimationItem(claimId, itemId, dto) {
        const claim = await this.claimRepository.findOne({ where: { id: claimId } });
        if (!claim) {
            throw new common_1.NotFoundException(`Claim with id ${claimId} not found`);
        }
        const item = await this.estimationItemRepository
            .createQueryBuilder('item')
            .leftJoin('item.estimation', 'estimation')
            .select(['item.id', 'item.isSelected', 'estimation.claimId'])
            .where('item.id = :itemId', { itemId })
            .andWhere('estimation.claimId = :claimId', { claimId })
            .getOne();
        if (!item) {
            throw new common_1.NotFoundException(`Estimation item ${itemId} not found for claim ${claimId}`);
        }
        await this.estimationItemRepository.update(itemId, { isSelected: dto.isSelected });
        return { id: itemId, isSelected: dto.isSelected };
    }
    async createApproval(claimId, dto, approver) {
        const claim = await this.claimRepository.findOne({ where: { id: claimId } });
        if (!claim) {
            throw new common_1.NotFoundException(`Claim with id ${claimId} not found`);
        }
        if (dto.decision === approval_entity_1.Decision.APPROVE || dto.decision === approval_entity_1.Decision.MODIFY) {
            const approval = await this.dataSource.transaction(async (manager) => {
                await manager.update(claim_entity_1.Claim, { id: claimId }, { status: claim_entity_1.ClaimStatus.DONE });
                const newApproval = manager.create(approval_entity_1.Approval, {
                    claimId,
                    approverId: approver.id,
                    decision: dto.decision,
                    approvedAmount: dto.approvedAmount ?? null,
                    comment: dto.comment ?? null,
                });
                return manager.save(newApproval);
            });
            return approval;
        }
        const newApproval = this.approvalRepository.create({
            claimId,
            approverId: approver.id,
            decision: dto.decision,
            approvedAmount: dto.approvedAmount ?? null,
            comment: dto.comment ?? null,
        });
        return this.approvalRepository.save(newApproval);
    }
    getClaimTypes() {
        return [
            { value: claim_entity_1.ClaimType.A, label: '하자보수 (Type A)' },
            { value: claim_entity_1.ClaimType.B, label: '소송/이의신청 (Type B)' },
            { value: claim_entity_1.ClaimType.C, label: '손해사정 (Type C)' },
        ];
    }
    getClaimStatuses() {
        return [
            { value: claim_entity_1.ClaimStatus.WAIT, label: '접수 대기' },
            { value: claim_entity_1.ClaimStatus.DONE, label: '처리 완료' },
            { value: claim_entity_1.ClaimStatus.SENT, label: '발송됨' },
            { value: claim_entity_1.ClaimStatus.TRANSFER, label: '이관' },
            { value: claim_entity_1.ClaimStatus.PAID, label: '지급 완료' },
        ];
    }
};
exports.ClaimsService = ClaimsService;
exports.ClaimsService = ClaimsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(claim_entity_1.Claim)),
    __param(1, (0, typeorm_1.InjectRepository)(type_a_detail_entity_1.TypeADetail)),
    __param(2, (0, typeorm_1.InjectRepository)(type_b_detail_entity_1.TypeBDetail)),
    __param(3, (0, typeorm_1.InjectRepository)(estimation_entity_1.Estimation)),
    __param(4, (0, typeorm_1.InjectRepository)(estimation_item_entity_1.EstimationItem)),
    __param(5, (0, typeorm_1.InjectRepository)(approval_entity_1.Approval)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _e : Object, typeof (_f = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _f : Object, typeof (_g = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _g : Object])
], ClaimsService);
//# sourceMappingURL=claims.service.js.map