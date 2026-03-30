import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { DocType } from '../entity/document.entity';

export class ListDocumentsDto {
  @ApiPropertyOptional({ description: 'Filter by claim ID', type: String, example: 'CLM-2024-001' })
  @IsOptional()
  @IsString()
  claimId?: string;

  @ApiPropertyOptional({ description: 'Filter by document type', enum: DocType, example: DocType.EXEMPTION_NOTICE })
  @IsOptional()
  @IsEnum(DocType)
  docType?: DocType;

  @ApiPropertyOptional({ description: 'Page number (1-based)', type: Number, default: 1, example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Items per page', type: Number, default: 10, example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 10;
}
