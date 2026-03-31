import { BaseEntity } from '@/common/entity/base.entity';
import { Approval } from '@/approvals/entity/approval.entity';
import { Claim } from '@/claims/entity/claim.entity';
export declare enum UserRole {
    ADJUSTER = "adjuster",
    LEGAL = "legal",
    ADMIN = "admin"
}
export declare class User extends BaseEntity {
    id: string;
    email: string;
    passwordHash: string;
    name: string;
    role: UserRole;
    isActive: boolean;
    deactivatedAt: Date | null;
    lastLoginAt: Date | null;
    claims: Claim[];
    approvals: Approval[];
}
