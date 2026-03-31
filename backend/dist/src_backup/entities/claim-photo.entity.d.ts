import { Claim } from './claim.entity';
export declare class ClaimPhoto {
    id: string;
    claimId: string;
    label: string | null;
    fileUrl: string;
    sortOrder: number;
    annotations: object[];
    createdAt: Date;
    updatedAt: Date;
    claim: Claim;
}
