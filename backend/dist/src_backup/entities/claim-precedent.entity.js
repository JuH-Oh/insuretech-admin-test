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
exports.ClaimPrecedent = void 0;
const typeorm_1 = require("typeorm");
const claim_entity_1 = require("./claim.entity");
let ClaimPrecedent = class ClaimPrecedent {
    id;
    claimId;
    caseNumber;
    description;
    sortOrder;
    createdAt;
    updatedAt;
    claim;
};
exports.ClaimPrecedent = ClaimPrecedent;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ClaimPrecedent.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, name: 'claim_id' }),
    __metadata("design:type", String)
], ClaimPrecedent.prototype, "claimId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, name: 'case_number' }),
    __metadata("design:type", String)
], ClaimPrecedent.prototype, "caseNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ClaimPrecedent.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'smallint', default: 0, name: 'sort_order' }),
    __metadata("design:type", Number)
], ClaimPrecedent.prototype, "sortOrder", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', name: 'created_at' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], ClaimPrecedent.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz', name: 'updated_at' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], ClaimPrecedent.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => claim_entity_1.Claim, (claim) => claim.precedents, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'claim_id' }),
    __metadata("design:type", claim_entity_1.Claim)
], ClaimPrecedent.prototype, "claim", void 0);
exports.ClaimPrecedent = ClaimPrecedent = __decorate([
    (0, typeorm_1.Entity)('claim_precedents')
], ClaimPrecedent);
//# sourceMappingURL=claim-precedent.entity.js.map