import { BaseEntity } from '@/common/entity/base.entity';
import { Claim } from '@/claims/entity/claim.entity';
import { EstimationItem } from './estimation-item.entity';
export declare class Estimation extends BaseEntity {
    claimId: string;
    totalAmount: number;
    calcSeconds: number | null;
    vendorEstimate: number | null;
    depreciation: number;
    indirectRate: number | null;
    finalAmount: number;
    claim: Claim;
    items: EstimationItem[];
}
