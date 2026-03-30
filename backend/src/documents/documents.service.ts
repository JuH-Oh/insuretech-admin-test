import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entity/document.entity';
import { ListDocumentsDto } from './dto/list-documents.dto';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
  ) {}

  async findAll(dto: ListDocumentsDto) {
    const { claimId, docType, page = 1, limit = 10 } = dto;
    const skip = (page - 1) * limit;

    const qb = this.documentRepository
      .createQueryBuilder('document')
      .leftJoin('document.claim', 'claim')
      .leftJoin('claim.complex', 'complex')
      .select([
        'document.id',
        'document.claimId',
        'document.docType',
        'document.title',
        'document.status',
        'document.fileUrl',
        'document.createdAt',
        'claim.id',
        'complex.name',
      ])
      .where('document.deletedAt IS NULL');

    if (claimId) {
      qb.andWhere('document.claimId = :claimId', { claimId });
    }

    if (docType) {
      qb.andWhere('document.docType = :docType', { docType });
    }

    const [rawItems, totalCount] = await qb
      .orderBy('document.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const items = rawItems.map((doc) => ({
      id: doc.id,
      claimId: doc.claimId,
      docType: doc.docType,
      title: doc.title,
      status: doc.status,
      fileUrl: doc.fileUrl,
      complexName: (doc.claim as unknown as { complex?: { name: string } })?.complex?.name ?? null,
      createdAt: doc.createdAt,
    }));

    const totalPages = Math.ceil(totalCount / limit);

    return { items, totalCount, page, totalPages };
  }
}
