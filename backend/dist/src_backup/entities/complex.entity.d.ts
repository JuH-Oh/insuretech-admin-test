import { Policy } from './policy.entity';
import { Claim } from './claim.entity';
export declare class Complex {
    id: string;
    name: string;
    address: string | null;
    builder: string | null;
    builtAt: Date | null;
    warrantyYr: number;
    createdAt: Date;
    updatedAt: Date;
    policies: Policy[];
    claims: Claim[];
}
