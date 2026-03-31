import { Claim } from './claim.entity';
export declare class ClaimAiReason {
    id: string;
    claimId: string;
    reasonText: string;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
    claim: Claim;
}
