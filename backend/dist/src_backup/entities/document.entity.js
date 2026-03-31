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
exports.Document = exports.DocStatus = exports.DocType = void 0;
const typeorm_1 = require("typeorm");
const claim_entity_1 = require("./claim.entity");
var DocType;
(function (DocType) {
    DocType["EXEMPTION_NOTICE"] = "exemption_notice";
    DocType["LITIGATION_BRIEF"] = "litigation_brief";
    DocType["ADJUSTMENT_OPINION"] = "adjustment_opinion";
    DocType["CIVIL_RESPONSE"] = "civil_response";
})(DocType || (exports.DocType = DocType = {}));
var DocStatus;
(function (DocStatus) {
    DocStatus["DRAFT"] = "draft";
    DocStatus["WAIT"] = "wait";
    DocStatus["DONE"] = "done";
    DocStatus["TRANSFER"] = "transfer";
})(DocStatus || (exports.DocStatus = DocStatus = {}));
let Document = class Document {
    id;
    claimId;
    docType;
    title;
    content;
    fileUrl;
    status;
    reviewedBy;
    reviewedAt;
    createdAt;
    updatedAt;
    claim;
};
exports.Document = Document;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Document.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, name: 'claim_id' }),
    __metadata("design:type", String)
], Document.prototype, "claimId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: DocType, name: 'doc_type' }),
    __metadata("design:type", String)
], Document.prototype, "docType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], Document.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Document.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'file_url' }),
    __metadata("design:type", Object)
], Document.prototype, "fileUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: DocStatus, nullable: true }),
    __metadata("design:type", Object)
], Document.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true, name: 'reviewed_by' }),
    __metadata("design:type", Object)
], Document.prototype, "reviewedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', nullable: true, name: 'reviewed_at' }),
    __metadata("design:type", Object)
], Document.prototype, "reviewedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', name: 'created_at' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Document.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz', name: 'updated_at' }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Document.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => claim_entity_1.Claim, (claim) => claim.documents, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'claim_id' }),
    __metadata("design:type", claim_entity_1.Claim)
], Document.prototype, "claim", void 0);
exports.Document = Document = __decorate([
    (0, typeorm_1.Entity)('documents')
], Document);
//# sourceMappingURL=document.entity.js.map