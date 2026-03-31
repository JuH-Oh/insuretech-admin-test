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
exports.Estimation = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/entity/base.entity");
const claim_entity_1 = require("../../claims/entity/claim.entity");
const estimation_item_entity_1 = require("./estimation-item.entity");
let Estimation = class Estimation extends base_entity_1.BaseEntity {
    claimId;
    totalAmount;
    calcSeconds;
    vendorEstimate;
    depreciation;
    indirectRate;
    finalAmount;
    claim;
    items;
};
exports.Estimation = Estimation;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ length: 20 }),
    __metadata("design:type", String)
], Estimation.prototype, "claimId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Estimation.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Estimation.prototype, "calcSeconds", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Estimation.prototype, "vendorEstimate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Estimation.prototype, "depreciation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 4, scale: 3, nullable: true }),
    __metadata("design:type", Object)
], Estimation.prototype, "indirectRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Estimation.prototype, "finalAmount", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => claim_entity_1.Claim, (claim) => claim.estimation, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'claim_id' }),
    __metadata("design:type", claim_entity_1.Claim)
], Estimation.prototype, "claim", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => estimation_item_entity_1.EstimationItem, (item) => item.estimation),
    __metadata("design:type", Array)
], Estimation.prototype, "items", void 0);
exports.Estimation = Estimation = __decorate([
    (0, typeorm_1.Entity)('estimations')
], Estimation);
//# sourceMappingURL=estimation.entity.js.map