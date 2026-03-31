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
exports.Policy = exports.PolicyType = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/entity/base.entity");
const complex_entity_1 = require("../../complexes/entity/complex.entity");
const claim_entity_1 = require("../../claims/entity/claim.entity");
var PolicyType;
(function (PolicyType) {
    PolicyType["FIRE"] = "fire";
    PolicyType["LIABILITY"] = "liability";
    PolicyType["HOUSING_FIRE"] = "housing_fire";
})(PolicyType || (exports.PolicyType = PolicyType = {}));
let Policy = class Policy extends base_entity_1.BaseEntity {
    id;
    complexId;
    policyType;
    holderName;
    validFrom;
    validUntil;
    deductible;
    complex;
    claims;
};
exports.Policy = Policy;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Policy.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Policy.prototype, "complexId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: PolicyType }),
    __metadata("design:type", String)
], Policy.prototype, "policyType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], Policy.prototype, "holderName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Object)
], Policy.prototype, "validFrom", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Object)
], Policy.prototype, "validUntil", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Policy.prototype, "deductible", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => complex_entity_1.Complex, (complex) => complex.policies),
    (0, typeorm_1.JoinColumn)({ name: 'complex_id' }),
    __metadata("design:type", complex_entity_1.Complex)
], Policy.prototype, "complex", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => claim_entity_1.Claim, (claim) => claim.policy),
    __metadata("design:type", Array)
], Policy.prototype, "claims", void 0);
exports.Policy = Policy = __decorate([
    (0, typeorm_1.Entity)('policies')
], Policy);
//# sourceMappingURL=policy.entity.js.map