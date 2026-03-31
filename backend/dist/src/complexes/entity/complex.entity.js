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
exports.Complex = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/entity/base.entity");
const policy_entity_1 = require("../../policies/entity/policy.entity");
const claim_entity_1 = require("../../claims/entity/claim.entity");
let Complex = class Complex extends base_entity_1.BaseEntity {
    id;
    name;
    address;
    builder;
    builtAt;
    warrantyYr;
    policies;
    claims;
};
exports.Complex = Complex;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Complex.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], Complex.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Complex.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], Complex.prototype, "builder", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Object)
], Complex.prototype, "builtAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'smallint', default: 10 }),
    __metadata("design:type", Number)
], Complex.prototype, "warrantyYr", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => policy_entity_1.Policy, (policy) => policy.complex),
    __metadata("design:type", Array)
], Complex.prototype, "policies", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => claim_entity_1.Claim, (claim) => claim.complex),
    __metadata("design:type", Array)
], Complex.prototype, "claims", void 0);
exports.Complex = Complex = __decorate([
    (0, typeorm_1.Entity)('complexes')
], Complex);
//# sourceMappingURL=complex.entity.js.map