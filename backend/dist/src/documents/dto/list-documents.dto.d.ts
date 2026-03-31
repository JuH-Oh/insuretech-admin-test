import { DocType } from '../entity/document.entity';
import { PaginationDto } from '@/common/dto/pagination.dto';
export declare class ListDocumentsDto extends PaginationDto {
    claimId?: string;
    docType?: DocType;
}
