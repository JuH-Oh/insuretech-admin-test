import { Claim } from './claim.entity';
export declare class ClaimPrecedent {
    id: string;
    claimId: string;
    caseNumber: string;
    description: string | null;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
    claim: Claim;
}
