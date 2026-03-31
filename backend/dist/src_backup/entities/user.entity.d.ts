import { Claim } from './claim.entity';
import { Approval } from './approval.entity';
export declare enum UserRole {
    ADJUSTER = "adjuster",
    LEGAL = "legal",
    ADMIN = "admin"
}
export declare class User {
    id: string;
    email: string;
    passwordHash: string | null;
    name: string;
    role: UserRole;
    isActive: boolean;
    deactivatedAt: Date | null;
    lastLoginAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    claims: Claim[];
    approvals: Approval[];
}
