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
exports.Claim = exports.ClaimStatus = exports.ClaimType = void 0;
const typeorm_1 = require("typeorm");
const complex_entity_1 = require("./complex.entity");
const policy_entity_1 = require("./policy.entity");
const user_entity_1 = require("./user.entity");
const claim_photo_entity_1 = require("./claim-photo.entity");
const claim_ai_reason_entity_1 = require("./claim-ai-reason.entity");
const claim_precedent_entity_1 = require("./claim-precedent.entity");
const claim_event_entity_1 = require("./claim-event.entity");
const document_entity_1 = require("./document.entity");
const approval_entity_1 = require("./approval.entity");
const type_a_detail_entity_1 = require("./type-a-detail.entity");
const type_b_detail_entity_1 = require("./type-b-detail.entity");
const estimation_entity_1 = require("./estimation.entity");
var ClaimType;
(function (ClaimType) {
    ClaimType["A"] = "A";
    ClaimType["B"] = "B";
    ClaimType["C"] = "C";
})(ClaimType || (exports.ClaimType = ClaimType = {}));
var ClaimStatus;
(function (ClaimStatus) {
    ClaimStatus["WAIT"] = "wait";
    ClaimStatus["DONE"] = "done";
    ClaimStatus["SENT"] = "sent";
    ClaimStatus["TRANSFER"] = "transfer";
    ClaimStatus["PAID"] = "paid";
})(ClaimStatus || (exports.ClaimStatus = ClaimStatus = {}));
let Claim = class Claim {
    id;
    complexId;
    policyId;
    assigneeId;
    claimantName;
    description;
    type;
    status;
    amount;
    aiConfidence;
    claimedAt;
    createdAt;
    updatedAt;
    complex;
    policy;
    assignee;
    photos;
    aiReasons;
    precedents;
    events;
    documents;
    approvals;
    typeADetail;
    typeBDetail;
    estimation;
};
exports.Claim = Claim;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], Claim.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', name: 'complex_id' }),
    __metadata("design:type", String)
], Claim.prototype, "complexId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true, name: 'policy_id' }),
    __metadata("design:type", Object)
], Claim.prototype, "policyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true, name: 'assignee_id' }),
    __metadata("design:type", Object)
], Claim.prototype, "assigneeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true, name: 'claimant_name' }),
    __metadata("design:type", Object)
], Claim.prototype, "claimantName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Claim.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ClaimType }),
    __metadata("design:type", String)
], Claim.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ClaimStatus }),
    __metadata("design:type", String)
], Claim.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Claim.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 4, scale: 3, nullable: true, name: 'ai_confidence' }),
    __metadata("design:type", Object)
], Claim.prototype, "aiConfidence", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', name: 'claimed_at' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Claim.prototype, "claimedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', name: 'created_at' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Claim.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz', name: 'updated_at' }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Claim.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => complex_entity_1.Complex, (complex) => complex.claims),
    (0, typeorm_1.JoinColumn)({ name: 'complex_id' }),
    __metadata("design:type", complex_entity_1.Complex)
], Claim.prototype, "complex", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => policy_entity_1.Policy, (policy) => policy.claims, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'policy_id' }),
    __metadata("design:type", Object)
], Claim.prototype, "policy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.claims, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'assignee_id' }),
    __metadata("design:type", Object)
], Claim.prototype, "assignee", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => claim_photo_entity_1.ClaimPhoto, (photo) => photo.claim),
    __metadata("design:type", Array)
], Claim.prototype, "photos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => claim_ai_reason_entity_1.ClaimAiReason, (reason) => reason.claim),
    __metadata("design:type", Array)
], Claim.prototype, "aiReasons", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => claim_precedent_entity_1.ClaimPrecedent, (precedent) => precedent.claim),
    __metadata("design:type", Array)
], Claim.prototype, "precedents", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => claim_event_entity_1.ClaimEvent, (event) => event.claim),
    __metadata("design:type", Array)
], Claim.prototype, "events", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => document_entity_1.Document, (doc) => doc.claim),
    __metadata("design:type", Array)
], Claim.prototype, "documents", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => approval_entity_1.Approval, (approval) => approval.claim),
    __metadata("design:type", Array)
], Claim.prototype, "approvals", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => type_a_detail_entity_1.TypeADetail, (detail) => detail.claim),
    __metadata("design:type", Object)
], Claim.prototype, "typeADetail", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => type_b_detail_entity_1.TypeBDetail, (detail) => detail.claim),
    __metadata("design:type", Object)
], Claim.prototype, "typeBDetail", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => estimation_entity_1.Estimation, (estimation) => estimation.claim),
    __metadata("design:type", Object)
], Claim.prototype, "estimation", void 0);
exports.Claim = Claim = __decorate([
    (0, typeorm_1.Index)(['type']),
    (0, typeorm_1.Index)(['status']),
    (0, typeorm_1.Index)(['claimedAt']),
    (0, typeorm_1.Index)(['complexId']),
    (0, typeorm_1.Entity)('claims')
], Claim);
//# sourceMappingURL=claim.entity.js.map