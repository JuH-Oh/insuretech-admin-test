import { Claim } from './claim.entity';
import { EstimationItem } from './estimation-item.entity';
export declare class Estimation {
    claimId: string;
    totalAmount: number;
    calcSeconds: number | null;
    vendorEstimate: number | null;
    depreciation: number;
    indirectRate: number | null;
    finalAmount: number;
    createdAt: Date;
    updatedAt: Date;
    claim: Claim;
    items: EstimationItem[];
}
