import { BaseEntity } from '@/common/entity/base.entity';
import { Claim } from './claim.entity';
export declare class TypeBDetail extends BaseEntity {
    claimId: string;
    applicableClause: string | null;
    objectionDeadline: Date | null;
    currentStep: number;
    flowSteps: object[];
    claim: Claim;
}
