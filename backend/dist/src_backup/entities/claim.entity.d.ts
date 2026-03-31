import { Complex } from './complex.entity';
import { Policy } from './policy.entity';
import { User } from './user.entity';
import { ClaimPhoto } from './claim-photo.entity';
import { ClaimAiReason } from './claim-ai-reason.entity';
import { ClaimPrecedent } from './claim-precedent.entity';
import { ClaimEvent } from './claim-event.entity';
import { Document } from './document.entity';
import { Approval } from './approval.entity';
import { TypeADetail } from './type-a-detail.entity';
import { TypeBDetail } from './type-b-detail.entity';
import { Estimation } from './estimation.entity';
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
export declare class Claim {
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
    createdAt: Date;
    updatedAt: Date;
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
