import { BaseEntity } from '@/common/entity/base.entity';
import { Policy } from '@/policies/entity/policy.entity';
import { Claim } from '@/claims/entity/claim.entity';
export declare class Complex extends BaseEntity {
    id: string;
    name: string;
    address: string | null;
    builder: string | null;
    builtAt: Date | null;
    warrantyYr: number;
    policies: Policy[];
    claims: Claim[];
}
