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
exports.TypeBDetail = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/entity/base.entity");
const claim_entity_1 = require("./claim.entity");
let TypeBDetail = class TypeBDetail extends base_entity_1.BaseEntity {
    claimId;
    applicableClause;
    objectionDeadline;
    currentStep;
    flowSteps;
    claim;
};
exports.TypeBDetail = TypeBDetail;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ length: 20 }),
    __metadata("design:type", String)
], TypeBDetail.prototype, "claimId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], TypeBDetail.prototype, "applicableClause", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Object)
], TypeBDetail.prototype, "objectionDeadline", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'smallint', default: 0 }),
    __metadata("design:type", Number)
], TypeBDetail.prototype, "currentStep", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: [] }),
    __metadata("design:type", Array)
], TypeBDetail.prototype, "flowSteps", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => claim_entity_1.Claim, (claim) => claim.typeBDetail, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'claim_id' }),
    __metadata("design:type", claim_entity_1.Claim)
], TypeBDetail.prototype, "claim", void 0);
exports.TypeBDetail = TypeBDetail = __decorate([
    (0, typeorm_1.Entity)('type_b_details')
], TypeBDetail);
//# sourceMappingURL=type-b-detail.entity.js.map