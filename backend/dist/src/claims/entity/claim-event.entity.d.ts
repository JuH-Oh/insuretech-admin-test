import { BaseEntity } from '@/common/entity/base.entity';
import { Claim } from './claim.entity';
export declare enum EventStatus {
    DONE = "done",
    NOW = "now",
    WAIT = "wait"
}
export declare class ClaimEvent extends BaseEntity {
    id: string;
    claimId: string;
    title: string;
    eventAt: Date | null;
    status: EventStatus;
    stepNumber: number | null;
    sortOrder: number;
    claim: Claim;
}
