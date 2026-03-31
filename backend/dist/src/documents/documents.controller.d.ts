import { DocumentsService } from './documents.service';
import { ApiResponseDto } from '@/common/dto/api-response.dto';
import { ListDocumentsDto } from './dto/list-documents.dto';
import { DocumentListResponseDto } from './dto/documents-response.dto';
export declare class DocumentsController {
    private readonly documentsService;
    constructor(documentsService: DocumentsService);
    getDocTypes(): ApiResponseDto<{
        value: string;
        label: string;
    }[]>;
    getDocStatuses(): ApiResponseDto<{
        value: string;
        label: string;
    }[]>;
    findAll(dto: ListDocumentsDto): Promise<ApiResponseDto<DocumentListResponseDto['data']>>;
}
