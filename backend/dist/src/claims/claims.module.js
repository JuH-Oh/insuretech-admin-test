"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const claim_entity_1 = require("./entity/claim.entity");
const claim_photo_entity_1 = require("./entity/claim-photo.entity");
const claim_ai_reason_entity_1 = require("./entity/claim-ai-reason.entity");
const claim_precedent_entity_1 = require("./entity/claim-precedent.entity");
const claim_event_entity_1 = require("./entity/claim-event.entity");
const type_a_detail_entity_1 = require("./entity/type-a-detail.entity");
const type_b_detail_entity_1 = require("./entity/type-b-detail.entity");
const estimation_entity_1 = require("@/estimations/entity/estimation.entity");
const estimation_item_entity_1 = require("@/estimations/entity/estimation-item.entity");
const approval_entity_1 = require("@/approvals/entity/approval.entity");
const claims_controller_1 = require("./claims.controller");
const claims_service_1 = require("./claims.service");
let ClaimsModule = class ClaimsModule {
};
exports.ClaimsModule = ClaimsModule;
exports.ClaimsModule = ClaimsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                claim_entity_1.Claim,
                claim_photo_entity_1.ClaimPhoto,
                claim_ai_reason_entity_1.ClaimAiReason,
                claim_precedent_entity_1.ClaimPrecedent,
                claim_event_entity_1.ClaimEvent,
                type_a_detail_entity_1.TypeADetail,
                type_b_detail_entity_1.TypeBDetail,
                estimation_entity_1.Estimation,
                estimation_item_entity_1.EstimationItem,
                approval_entity_1.Approval,
            ]),
        ],
        controllers: [claims_controller_1.ClaimsController],
        providers: [claims_service_1.ClaimsService],
        exports: [typeorm_1.TypeOrmModule],
    })
], ClaimsModule);
//# sourceMappingURL=claims.module.js.map