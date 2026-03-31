"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seed_data_source_1 = __importDefault(require("./seed-data-source"));
const user_entity_1 = require("../users/entity/user.entity");
const complex_entity_1 = require("../complexes/entity/complex.entity");
const policy_entity_1 = require("../policies/entity/policy.entity");
const claim_entity_1 = require("../claims/entity/claim.entity");
const bcrypt = __importStar(require("bcrypt"));
async function seed() {
    await seed_data_source_1.default.initialize();
    console.log('Seeding database...');
    const passwordHash = await bcrypt.hash('password123', 10);
    const adminUser = await seed_data_source_1.default.manager.save(seed_data_source_1.default.manager.create(user_entity_1.User, {
        email: 'admin@insuretech.com',
        passwordHash,
        name: 'Admin User',
        role: user_entity_1.UserRole.ADMIN,
        isActive: true,
    }));
    const adjusterUser = await seed_data_source_1.default.manager.save(seed_data_source_1.default.manager.create(user_entity_1.User, {
        email: 'adjuster@insuretech.com',
        passwordHash,
        name: 'Adjuster User',
        role: user_entity_1.UserRole.ADJUSTER,
        isActive: true,
    }));
    const complex1 = await seed_data_source_1.default.manager.save(seed_data_source_1.default.manager.create(complex_entity_1.Complex, {
        name: 'Central Park Apartments',
        address: '123 Main St, Anytown, USA',
        builder: 'BuildCorp',
        builtAt: new Date('2018-05-20'),
        warrantyYr: 10,
    }));
    const policy1 = await seed_data_source_1.default.manager.save(seed_data_source_1.default.manager.create(policy_entity_1.Policy, {
        complexId: complex1.id,
        policyType: policy_entity_1.PolicyType.HOUSING_FIRE,
        holderName: 'Central Park HOA',
        validFrom: new Date('2023-01-01'),
        validUntil: new Date('2024-01-01'),
        deductible: 5000,
    }));
    const claimsData = [
        { id: 'CLM-0241', description: 'Water damage in unit 101', type: claim_entity_1.ClaimType.A, status: claim_entity_1.ClaimStatus.WAIT, amount: 15000 },
        { id: 'CLM-0242', description: 'Roof leak in building B', type: claim_entity_1.ClaimType.A, status: claim_entity_1.ClaimStatus.DONE, amount: 25000 },
        { id: 'CLM-0243', description: 'Fire damage in the clubhouse', type: claim_entity_1.ClaimType.B, status: claim_entity_1.ClaimStatus.SENT, amount: 120000 },
        { id: 'CLM-0244', description: 'Cracked foundation in building C', type: claim_entity_1.ClaimType.C, status: claim_entity_1.ClaimStatus.TRANSFER, amount: 350000 },
        { id: 'CLM-0245', description: 'Broken window in unit 204', type: claim_entity_1.ClaimType.A, status: claim_entity_1.ClaimStatus.PAID, amount: 800 },
        { id: 'CLM-0246', description: 'Elevator malfunction in building A', type: claim_entity_1.ClaimType.B, status: claim_entity_1.ClaimStatus.WAIT, amount: 45000 },
        { id: 'CLM-0247', description: 'Common area plumbing issue', type: claim_entity_1.ClaimType.A, status: claim_entity_1.ClaimStatus.DONE, amount: 7500 },
    ];
    for (const data of claimsData) {
        await seed_data_source_1.default.manager.save(seed_data_source_1.default.manager.create(claim_entity_1.Claim, {
            ...data,
            complexId: complex1.id,
            policyId: policy1.id,
            assigneeId: adjusterUser.id,
            claimantName: 'John Doe',
            claimedAt: new Date(),
        }));
    }
    console.log('Seeding complete.');
    await seed_data_source_1.default.destroy();
}
seed().catch((error) => console.error('Seeding failed:', error));
//# sourceMappingURL=seed.js.map