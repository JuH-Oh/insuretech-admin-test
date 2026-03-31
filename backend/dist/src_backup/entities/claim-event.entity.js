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
exports.ClaimEvent = exports.EventStatus = void 0;
const typeorm_1 = require("typeorm");
const claim_entity_1 = require("./claim.entity");
var EventStatus;
(function (EventStatus) {
    EventStatus["DONE"] = "done";
    EventStatus["NOW"] = "now";
    EventStatus["WAIT"] = "wait";
})(EventStatus || (exports.EventStatus = EventStatus = {}));
let ClaimEvent = class ClaimEvent {
    id;
    claimId;
    title;
    eventAt;
    status;
    stepNumber;
    sortOrder;
    createdAt;
    updatedAt;
    claim;
};
exports.ClaimEvent = ClaimEvent;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ClaimEvent.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, name: 'claim_id' }),
    __metadata("design:type", String)
], ClaimEvent.prototype, "claimId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], ClaimEvent.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', nullable: true, name: 'event_at' }),
    __metadata("design:type", Object)
], ClaimEvent.prototype, "eventAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: EventStatus }),
    __metadata("design:type", String)
], ClaimEvent.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'smallint', nullable: true, name: 'step_number' }),
    __metadata("design:type", Object)
], ClaimEvent.prototype, "stepNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'smallint', default: 0, name: 'sort_order' }),
    __metadata("design:type", Number)
], ClaimEvent.prototype, "sortOrder", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', name: 'created_at' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], ClaimEvent.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz', name: 'updated_at' }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], ClaimEvent.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => claim_entity_1.Claim, (claim) => claim.events, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'claim_id' }),
    __metadata("design:type", claim_entity_1.Claim)
], ClaimEvent.prototype, "claim", void 0);
exports.ClaimEvent = ClaimEvent = __decorate([
    (0, typeorm_1.Entity)('claim_events')
], ClaimEvent);
//# sourceMappingURL=claim-event.entity.js.map