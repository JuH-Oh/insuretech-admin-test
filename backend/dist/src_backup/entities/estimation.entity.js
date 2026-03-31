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
exports.Estimation = void 0;
const typeorm_1 = require("typeorm");
const claim_entity_1 = require("./claim.entity");
const estimation_item_entity_1 = require("./estimation-item.entity");
let Estimation = class Estimation {
    claimId;
    totalAmount;
    calcSeconds;
    vendorEstimate;
    depreciation;
    indirectRate;
    finalAmount;
    createdAt;
    updatedAt;
    claim;
    items;
};
exports.Estimation = Estimation;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 20, name: 'claim_id' }),
    __metadata("design:type", String)
], Estimation.prototype, "claimId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'total_amount' }),
    __metadata("design:type", Number)
], Estimation.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true, name: 'calc_seconds' }),
    __metadata("design:type", Object)
], Estimation.prototype, "calcSeconds", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true, name: 'vendor_estimate' }),
    __metadata("design:type", Object)
], Estimation.prototype, "vendorEstimate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Estimation.prototype, "depreciation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 4, scale: 3, nullable: true, name: 'indirect_rate' }),
    __metadata("design:type", Object)
], Estimation.prototype, "indirectRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'final_amount' }),
    __metadata("design:type", Number)
], Estimation.prototype, "finalAmount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', name: 'created_at' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Estimation.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz', name: 'updated_at' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Estimation.prototype, "updatedAt", void 0);
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