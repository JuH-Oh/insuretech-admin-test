import { Claim } from './claim.entity';
export declare enum EventStatus {
    DONE = "done",
    NOW = "now",
    WAIT = "wait"
}
export declare class ClaimEvent {
    id: string;
    claimId: string;
    title: string;
    eventAt: Date | null;
    status: EventStatus;
    stepNumber: number | null;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
    claim: Claim;
}
