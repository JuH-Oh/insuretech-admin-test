import { Claim } from './claim.entity';
import { User } from './user.entity';
export declare enum Decision {
    APPROVE = "approve",
    MODIFY = "modify",
    RECLASSIFY = "reclassify",
    REJECT = "reject"
}
export declare class Approval {
    id: string;
    claimId: string;
    approverId: string;
    decision: Decision;
    approvedAmount: number | null;
    comment: string | null;
    decidedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    claim: Claim;
    approver: User;
}
