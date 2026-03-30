import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ClaimListItemDto {
  @ApiProperty({ description: 'Claim ID', type: String, example: 'CLM-2024-001' })
  id: string;

  @ApiProperty({ description: 'Complex name', type: String, example: '강남 아파트' })
  complexName: string;

  @ApiProperty({ description: 'Claim description', type: String, example: '누수 피해' })
  description: string;

  @ApiProperty({ description: 'Claimed date', type: String, example: '2024-01-15T00:00:00.000Z' })
  claimedAt: Date;

  @ApiProperty({ description: 'Claim type', type: String, example: 'A' })
  type: string;

  @ApiProperty({ description: 'Claim status', type: String, example: 'wait' })
  status: string;

  @ApiPropertyOptional({ description: 'AI confidence score', type: Number, example: 0.85 })
  aiConfidence: number | null;

  @ApiPropertyOptional({ description: 'Claim amount', type: Number, example: 5000000 })
  amount: number | null;
}

export class ClaimListDataDto {
  @ApiProperty({ description: 'List of claims', type: [ClaimListItemDto] })
  items: ClaimListItemDto[];

  @ApiProperty({ description: 'Total number of records', type: Number, example: 100 })
  totalCount: number;

  @ApiProperty({ description: 'Current page number', type: Number, example: 1 })
  page: number;

  @ApiProperty({ description: 'Total number of pages', type: Number, example: 10 })
  totalPages: number;
}

export class ClaimListResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Claims retrieved successfully' })
  message: string;

  @ApiProperty({ type: ClaimListDataDto })
  data: ClaimListDataDto;
}

export class ClaimDetailResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Claim retrieved successfully' })
  message: string;

  @ApiProperty({ description: 'Claim detail data' })
  data: Record<string, unknown>;
}

export class EstimationResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Estimation retrieved successfully' })
  message: string;

  @ApiProperty({ description: 'Estimation data' })
  data: Record<string, unknown>;
}

export class ApprovalResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Approval created successfully' })
  message: string;

  @ApiProperty({ description: 'Approval data' })
  data: Record<string, unknown>;
}
