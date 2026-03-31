import { BaseEntity } from '@/common/entity/base.entity';
import { Claim } from './claim.entity';
export declare class ClaimPrecedent extends BaseEntity {
    id: string;
    claimId: string;
    caseNumber: string;
    description: string | null;
    sortOrder: number;
    claim: Claim;
}
