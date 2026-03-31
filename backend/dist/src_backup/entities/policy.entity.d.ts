import { Complex } from './complex.entity';
import { Claim } from './claim.entity';
export declare enum PolicyType {
    FIRE = "fire",
    LIABILITY = "liability",
    HOUSING_FIRE = "housing_fire"
}
export declare class Policy {
    id: string;
    complexId: string;
    policyType: PolicyType;
    holderName: string | null;
    validFrom: Date | null;
    validUntil: Date | null;
    deductible: number;
    createdAt: Date;
    updatedAt: Date;
    complex: Complex;
    claims: Claim[];
}
