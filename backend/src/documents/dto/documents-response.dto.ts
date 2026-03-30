import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DocumentListItemDto {
  @ApiProperty({ description: 'Document ID', type: String, example: 'uuid-here' })
  id: string;

  @ApiProperty({ description: 'Associated claim ID', type: String, example: 'CLM-2024-001' })
  claimId: string;

  @ApiProperty({ description: 'Document type', type: String, example: 'exemption_notice' })
  docType: string;

  @ApiProperty({ description: 'Document title', type: String, example: '면책 통지서' })
  title: string;

  @ApiPropertyOptional({ description: 'Document status', type: String, example: 'done' })
  status: string | null;

  @ApiPropertyOptional({ description: 'File URL', type: String, example: 'https://...' })
  fileUrl: string | null;

  @ApiPropertyOptional({ description: 'Complex name', type: String, example: '강남 아파트' })
  complexName: string | null;

  @ApiProperty({ description: 'Created date', type: String, example: '2024-01-15T00:00:00.000Z' })
  createdAt: Date;
}

export class DocumentListDataDto {
  @ApiProperty({ description: 'List of documents', type: [DocumentListItemDto] })
  items: DocumentListItemDto[];

  @ApiProperty({ description: 'Total number of records', type: Number, example: 50 })
  totalCount: number;

  @ApiProperty({ description: 'Current page number', type: Number, example: 1 })
  page: number;

  @ApiProperty({ description: 'Total number of pages', type: Number, example: 5 })
  totalPages: number;
}

export class DocumentListResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Documents retrieved successfully' })
  message: string;

  @ApiProperty({ type: DocumentListDataDto })
  data: DocumentListDataDto;
}
