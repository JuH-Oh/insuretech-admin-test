import { DataSource, Repository } from 'typeorm';
import { Claim } from './entity/claim.entity';
import { TypeADetail } from './entity/type-a-detail.entity';
import { TypeBDetail } from './entity/type-b-detail.entity';
import { Estimation } from '@/estimations/entity/estimation.entity';
import { EstimationItem } from '@/estimations/entity/estimation-item.entity';
import { Approval } from '@/approvals/entity/approval.entity';
import { ListClaimsDto } from './dto/list-claims.dto';
import { UpdateEstimationItemDto } from './dto/update-estimation-item.dto';
import { CreateApprovalDto } from './dto/create-approval.dto';
import { User } from '@/users/entity/user.entity';
export declare class ClaimsService {
    private readonly claimRepository;
    private readonly typeADetailRepository;
    private readonly typeBDetailRepository;
    private readonly estimationRepository;
    private readonly estimationItemRepository;
    private readonly approvalRepository;
    private readonly dataSource;
    constructor(claimRepository: Repository<Claim>, typeADetailRepository: Repository<TypeADetail>, typeBDetailRepository: Repository<TypeBDetail>, estimationRepository: Repository<Estimation>, estimationItemRepository: Repository<EstimationItem>, approvalRepository: Repository<Approval>, dataSource: DataSource);
    findAll(dto: ListClaimsDto): unknown;
    findOne(id: string): unknown;
    findEstimation(claimId: string): unknown;
    private loadEstimation;
    updateEstimationItem(claimId: string, itemId: number, dto: UpdateEstimationItemDto): unknown;
    createApproval(claimId: string, dto: CreateApprovalDto, approver: User): unknown;
    getClaimTypes(): {
        value: string;
        label: string;
    }[];
    getClaimStatuses(): {
        value: string;
        label: string;
    }[];
}
