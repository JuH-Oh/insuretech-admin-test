import { ClaimStatus, ClaimType } from '../entity/claim.entity';
import { PaginationDto } from '@/common/dto/pagination.dto';
export declare class ListClaimsDto extends PaginationDto {
    type?: ClaimType;
    status?: ClaimStatus;
    search?: string;
}
