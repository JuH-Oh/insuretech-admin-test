import { Claim } from './claim.entity';
export declare class TypeBDetail {
    claimId: string;
    applicableClause: string | null;
    objectionDeadline: Date | null;
    currentStep: number;
    flowSteps: object[];
    createdAt: Date;
    updatedAt: Date;
    claim: Claim;
}
