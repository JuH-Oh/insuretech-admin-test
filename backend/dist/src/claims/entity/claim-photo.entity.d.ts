import { BaseEntity } from '@/common/entity/base.entity';
import { Claim } from './claim.entity';
export declare class ClaimPhoto extends BaseEntity {
    id: string;
    claimId: string;
    label: string | null;
    fileUrl: string;
    sortOrder: number;
    annotations: object[];
    claim: Claim;
}
