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
exports.ClaimAiReason = void 0;
const typeorm_1 = require("typeorm");
const claim_entity_1 = require("./claim.entity");
let ClaimAiReason = class ClaimAiReason {
    id;
    claimId;
    reasonText;
    sortOrder;
    createdAt;
    updatedAt;
    claim;
};
exports.ClaimAiReason = ClaimAiReason;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ClaimAiReason.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, name: 'claim_id' }),
    __metadata("design:type", String)
], ClaimAiReason.prototype, "claimId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'reason_text' }),
    __metadata("design:type", String)
], ClaimAiReason.prototype, "reasonText", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'smallint', default: 0, name: 'sort_order' }),
    __metadata("design:type", Number)
], ClaimAiReason.prototype, "sortOrder", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', name: 'created_at' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], ClaimAiReason.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz', name: 'updated_at' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], ClaimAiReason.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => claim_entity_1.Claim, (claim) => claim.aiReasons, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'claim_id' }),
    __metadata("design:type", claim_entity_1.Claim)
], ClaimAiReason.prototype, "claim", void 0);
exports.ClaimAiReason = ClaimAiReason = __decorate([
    (0, typeorm_1.Entity)('claim_ai_reasons')
], ClaimAiReason);
//# sourceMappingURL=claim-ai-reason.entity.js.map