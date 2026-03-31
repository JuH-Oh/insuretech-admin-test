import { BaseEntity } from '@/common/entity/base.entity';
import { Claim } from './claim.entity';
export declare class ClaimAiReason extends BaseEntity {
    id: string;
    claimId: string;
    reasonText: string;
    sortOrder: number;
    claim: Claim;
}
