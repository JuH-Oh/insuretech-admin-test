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
exports.Approval = exports.Decision = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/entity/base.entity");
const claim_entity_1 = require("../../claims/entity/claim.entity");
const user_entity_1 = require("../../users/entity/user.entity");
var Decision;
(function (Decision) {
    Decision["APPROVE"] = "approve";
    Decision["MODIFY"] = "modify";
    Decision["RECLASSIFY"] = "reclassify";
    Decision["REJECT"] = "reject";
})(Decision || (exports.Decision = Decision = {}));
let Approval = class Approval extends base_entity_1.BaseEntity {
    id;
    claimId;
    approverId;
    decision;
    approvedAmount;
    comment;
    decidedAt;
    claim;
    approver;
};
exports.Approval = Approval;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Approval.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], Approval.prototype, "claimId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Approval.prototype, "approverId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Decision }),
    __metadata("design:type", String)
], Approval.prototype, "decision", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Approval.prototype, "approvedAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Approval.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Approval.prototype, "decidedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => claim_entity_1.Claim, (claim) => claim.approvals),
    (0, typeorm_1.JoinColumn)({ name: 'claim_id' }),
    __metadata("design:type", claim_entity_1.Claim)
], Approval.prototype, "claim", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.approvals),
    (0, typeorm_1.JoinColumn)({ name: 'approver_id' }),
    __metadata("design:type", user_entity_1.User)
], Approval.prototype, "approver", void 0);
exports.Approval = Approval = __decorate([
    (0, typeorm_1.Entity)('approvals')
], Approval);
//# sourceMappingURL=approval.entity.js.map