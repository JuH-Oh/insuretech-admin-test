import { Repository } from 'typeorm';
import { Document } from './entity/document.entity';
import { ListDocumentsDto } from './dto/list-documents.dto';
export declare class DocumentsService {
    private readonly documentRepository;
    constructor(documentRepository: Repository<Document>);
    findAll(dto: ListDocumentsDto): unknown;
    getDocTypes(): {
        value: string;
        label: string;
    }[];
    getDocStatuses(): {
        value: string;
        label: string;
    }[];
}
