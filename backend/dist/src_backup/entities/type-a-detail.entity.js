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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeADetail = void 0;
const typeorm_1 = require("typeorm");
const claim_entity_1 = require("./claim.entity");
let TypeADetail = class TypeADetail {
    claimId;
    defectType;
    warrantyRemaining;
    totalClaimEst;
    unitClaimEst;
    isExemption;
    createdAt;
    updatedAt;
    claim;
};
exports.TypeADetail = TypeADetail;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 20, name: 'claim_id' }),
    __metadata("design:type", String)
], TypeADetail.prototype, "claimId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200, nullable: true, name: 'defect_type' }),
    __metadata("design:type", Object)
], TypeADetail.prototype, "defectType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true, name: 'warranty_remaining' }),
    __metadata("design:type", Object)
], TypeADetail.prototype, "warrantyRemaining", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', nullable: true, name: 'total_claim_est' }),
    __metadata("design:type", Object)
], TypeADetail.prototype, "totalClaimEst", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', nullable: true, name: 'unit_claim_est' }),
    __metadata("design:type", Object)
], TypeADetail.prototype, "unitClaimEst", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true, name: 'is_exemption' }),
    __metadata("design:type", Boolean)
], TypeADetail.prototype, "isExemption", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', name: 'created_at' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], TypeADetail.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz', name: 'updated_at' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], TypeADetail.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => claim_entity_1.Claim, (claim) => claim.typeADetail, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'claim_id' }),
    __metadata("design:type", claim_entity_1.Claim)
], TypeADetail.prototype, "claim", void 0);
exports.TypeADetail = TypeADetail = __decorate([
    (0, typeorm_1.Entity)('type_a_details')
], TypeADetail);
//# sourceMappingURL=type-a-detail.entity.js.map