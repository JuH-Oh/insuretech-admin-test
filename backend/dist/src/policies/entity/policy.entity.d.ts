import { BaseEntity } from '@/common/entity/base.entity';
import { Complex } from '@/complexes/entity/complex.entity';
import { Claim } from '@/claims/entity/claim.entity';
export declare enum PolicyType {
    FIRE = "fire",
    LIABILITY = "liability",
    HOUSING_FIRE = "housing_fire"
}
export declare class Policy extends BaseEntity {
    id: string;
    complexId: string;
    policyType: PolicyType;
    holderName: string | null;
    validFrom: Date | null;
    validUntil: Date | null;
    deductible: number;
    complex: Complex;
    claims: Claim[];
}
