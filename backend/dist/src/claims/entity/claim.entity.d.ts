import { BaseEntity } from '@/common/entity/base.entity';
import { Complex } from '@/complexes/entity/complex.entity';
import { Policy } from '@/policies/entity/policy.entity';
import { User } from '@/users/entity/user.entity';
import { ClaimPhoto } from './claim-photo.entity';
import { ClaimAiReason } from './claim-ai-reason.entity';
import { ClaimPrecedent } from './claim-precedent.entity';
import { ClaimEvent } from './claim-event.entity';
import { Document } from '@/documents/entity/document.entity';
import { Approval } from '@/approvals/entity/approval.entity';
import { TypeADetail } from './type-a-detail.entity';
import { TypeBDetail } from './type-b-detail.entity';
import { Estimation } from '@/estimations/entity/estimation.entity';
export declare enum ClaimType {
    A = "A",
    B = "B",
    C = "C"
}
export declare enum ClaimStatus {
    WAIT = "wait",
    DONE = "done",
    SENT = "sent",
    TRANSFER = "transfer",
    PAID = "paid"
}
export declare class Claim extends BaseEntity {
    id: string;
    complexId: string;
    policyId: string | null;
    assigneeId: string | null;
    claimantName: string | null;
    description: string;
    type: ClaimType;
    status: ClaimStatus;
    amount: number | null;
    aiConfidence: number | null;
    claimedAt: Date;
    complex: Complex;
    policy: Policy | null;
    assignee: User | null;
    photos: ClaimPhoto[];
    aiReasons: ClaimAiReason[];
    precedents: ClaimPrecedent[];
    events: ClaimEvent[];
    documents: Document[];
    approvals: Approval[];
    typeADetail: TypeADetail | null;
    typeBDetail: TypeBDetail | null;
    estimation: Estimation | null;
}
