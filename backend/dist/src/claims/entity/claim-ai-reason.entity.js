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
exports.ClaimAiReason = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/entity/base.entity");
const claim_entity_1 = require("./claim.entity");
let ClaimAiReason = class ClaimAiReason extends base_entity_1.BaseEntity {
    id;
    claimId;
    reasonText;
    sortOrder;
    claim;
};
exports.ClaimAiReason = ClaimAiReason;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ClaimAiReason.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], ClaimAiReason.prototype, "claimId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ClaimAiReason.prototype, "reasonText", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'smallint', default: 0 }),
    __metadata("design:type", Number)
], ClaimAiReason.prototype, "sortOrder", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => claim_entity_1.Claim, (claim) => claim.aiReasons, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'claim_id' }),
    __metadata("design:type", claim_entity_1.Claim)
], ClaimAiReason.prototype, "claim", void 0);
exports.ClaimAiReason = ClaimAiReason = __decorate([
    (0, typeorm_1.Entity)('claim_ai_reasons')
], ClaimAiReason);
//# sourceMappingURL=claim-ai-reason.entity.js.map