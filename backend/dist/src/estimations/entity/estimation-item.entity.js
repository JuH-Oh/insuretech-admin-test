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
exports.EstimationItem = exports.StandardSource = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/entity/base.entity");
const estimation_entity_1 = require("./estimation.entity");
var StandardSource;
(function (StandardSource) {
    StandardSource["STANDARD_COST"] = "standard_cost";
    StandardSource["PRICE_INDEX"] = "price_index";
})(StandardSource || (exports.StandardSource = StandardSource = {}));
let EstimationItem = class EstimationItem extends base_entity_1.BaseEntity {
    id;
    estimationId;
    name;
    description;
    quantity;
    unit;
    standardSrc;
    subtotal;
    isSelected;
    sortOrder;
    estimation;
};
exports.EstimationItem = EstimationItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], EstimationItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], EstimationItem.prototype, "estimationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], EstimationItem.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200, nullable: true }),
    __metadata("design:type", Object)
], EstimationItem.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], EstimationItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], EstimationItem.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: StandardSource, nullable: true }),
    __metadata("design:type", Object)
], EstimationItem.prototype, "standardSrc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], EstimationItem.prototype, "subtotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], EstimationItem.prototype, "isSelected", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'smallint', default: 0 }),
    __metadata("design:type", Number)
], EstimationItem.prototype, "sortOrder", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => estimation_entity_1.Estimation, (estimation) => estimation.items, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'estimation_id' }),
    __metadata("design:type", estimation_entity_1.Estimation)
], EstimationItem.prototype, "estimation", void 0);
exports.EstimationItem = EstimationItem = __decorate([
    (0, typeorm_1.Entity)('estimation_items')
], EstimationItem);
//# sourceMappingURL=estimation-item.entity.js.map