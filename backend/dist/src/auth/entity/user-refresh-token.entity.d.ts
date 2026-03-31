import { BaseEntity } from '@/common/entity/base.entity';
import { User } from '@/users/entity/user.entity';
export declare class UserRefreshToken extends BaseEntity {
    id: string;
    userId: string;
    refreshToken: string;
    ipAddress: string;
    userAgent: string;
    expiresAt: Date;
    user: User;
}
