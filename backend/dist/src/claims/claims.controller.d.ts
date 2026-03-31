import { ClaimsService } from './claims.service';
import { ApiResponseDto } from '@/common/dto/api-response.dto';
import { User } from '@/users/entity/user.entity';
import { ListClaimsDto } from './dto/list-claims.dto';
import { UpdateEstimationItemDto } from './dto/update-estimation-item.dto';
import { CreateApprovalDto } from './dto/create-approval.dto';
import { ClaimListResponseDto, ClaimDetailResponseDto } from './dto/claims-response.dto';
export declare class ClaimsController {
    private readonly claimsService;
    constructor(claimsService: ClaimsService);
    getClaimTypes(): ApiResponseDto<{
        value: string;
        label: string;
    }[]>;
    getClaimStatuses(): ApiResponseDto<{
        value: string;
        label: string;
    }[]>;
    findAll(dto: ListClaimsDto): Promise<ApiResponseDto<ClaimListResponseDto['data']>>;
    findOne(id: string): Promise<ApiResponseDto<ClaimDetailResponseDto['data']>>;
    getEstimation(id: string): Promise<ApiResponseDto<unknown>>;
    updateEstimationItem(id: string, itemId: number, dto: UpdateEstimationItemDto): Promise<ApiResponseDto<{
        id: number;
        isSelected: boolean;
    }>>;
    createApproval(id: string, dto: CreateApprovalDto, user: User): Promise<ApiResponseDto<unknown>>;
}
