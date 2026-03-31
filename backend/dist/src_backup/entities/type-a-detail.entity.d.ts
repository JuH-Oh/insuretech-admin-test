import { Claim } from './claim.entity';
export declare class TypeADetail {
    claimId: string;
    defectType: string | null;
    warrantyRemaining: string | null;
    totalClaimEst: number | null;
    unitClaimEst: number | null;
    isExemption: boolean;
    createdAt: Date;
    updatedAt: Date;
    claim: Claim;
}
