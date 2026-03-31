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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeBDetail = void 0;
const typeorm_1 = require("typeorm");
const claim_entity_1 = require("./claim.entity");
let TypeBDetail = class TypeBDetail {
    claimId;
    applicableClause;
    objectionDeadline;
    currentStep;
    flowSteps;
    createdAt;
    updatedAt;
    claim;
};
exports.TypeBDetail = TypeBDetail;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 20, name: 'claim_id' }),
    __metadata("design:type", String)
], TypeBDetail.prototype, "claimId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'applicable_clause' }),
    __metadata("design:type", Object)
], TypeBDetail.prototype, "applicableClause", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true, name: 'objection_deadline' }),
    __metadata("design:type", Object)
], TypeBDetail.prototype, "objectionDeadline", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'smallint', default: 0, name: 'current_step' }),
    __metadata("design:type", Number)
], TypeBDetail.prototype, "currentStep", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: [], name: 'flow_steps' }),
    __metadata("design:type", Array)
], TypeBDetail.prototype, "flowSteps", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', name: 'created_at' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], TypeBDetail.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz', name: 'updated_at' }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], TypeBDetail.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => claim_entity_1.Claim, (claim) => claim.typeBDetail, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'claim_id' }),
    __metadata("design:type", claim_entity_1.Claim)
], TypeBDetail.prototype, "claim", void 0);
exports.TypeBDetail = TypeBDetail = __decorate([
    (0, typeorm_1.Entity)('type_b_details')
], TypeBDetail);
//# sourceMappingURL=type-b-detail.entity.js.map