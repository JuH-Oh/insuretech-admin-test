import { Decision } from '@/approvals/entity/approval.entity';
export declare class CreateApprovalDto {
    decision: Decision;
    approvedAmount?: number;
    comment?: string;
}
