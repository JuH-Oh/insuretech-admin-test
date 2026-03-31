import { BaseEntity } from '@/common/entity/base.entity';
import { Claim } from './claim.entity';
export declare class TypeADetail extends BaseEntity {
    claimId: string;
    defectType: string | null;
    warrantyRemaining: string | null;
    totalClaimEst: number | null;
    unitClaimEst: number | null;
    isExemption: boolean;
    claim: Claim;
}
