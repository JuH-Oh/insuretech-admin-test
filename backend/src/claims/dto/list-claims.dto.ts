import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ClaimStatus, ClaimType } from '../entity/claim.entity';

export class ListClaimsDto {
  @ApiPropertyOptional({ description: 'Filter by claim type', enum: ClaimType, example: ClaimType.A })
  @IsOptional()
  @IsEnum(ClaimType)
  type?: ClaimType;

  @ApiPropertyOptional({ description: 'Filter by claim status', enum: ClaimStatus, example: ClaimStatus.WAIT })
  @IsOptional()
  @IsEnum(ClaimStatus)
  status?: ClaimStatus;

  @ApiPropertyOptional({ description: 'Search by complex name, claim id, or description', type: String, example: '강남' })
  @IsOptional()
  @IsString()
  search?: string;

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
