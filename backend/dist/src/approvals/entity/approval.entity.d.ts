import { BaseEntity } from '@/common/entity/base.entity';
import { Claim } from '@/claims/entity/claim.entity';
import { User } from '@/users/entity/user.entity';
export declare enum Decision {
    APPROVE = "approve",
    MODIFY = "modify",
    RECLASSIFY = "reclassify",
    REJECT = "reject"
}
export declare class Approval extends BaseEntity {
    id: string;
    claimId: string;
    approverId: string;
    decision: Decision;
    approvedAmount: number | null;
    comment: string | null;
    decidedAt: Date;
    claim: Claim;
    approver: User;
}
