import { BaseEntity } from '@/common/entity/base.entity';
import { Claim } from '@/claims/entity/claim.entity';
export declare enum DocType {
    EXEMPTION_NOTICE = "exemption_notice",
    LITIGATION_BRIEF = "litigation_brief",
    ADJUSTMENT_OPINION = "adjustment_opinion",
    CIVIL_RESPONSE = "civil_response"
}
export declare enum DocStatus {
    DRAFT = "draft",
    WAIT = "wait",
    DONE = "done",
    TRANSFER = "transfer"
}
export declare class Document extends BaseEntity {
    id: string;
    claimId: string;
    docType: DocType;
    title: string;
    content: string | null;
    fileUrl: string | null;
    status: DocStatus | null;
    reviewedBy: string | null;
    reviewedAt: Date | null;
    claim: Claim;
}
