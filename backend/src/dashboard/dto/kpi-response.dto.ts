import { ApiProperty } from '@nestjs/swagger';

export class KpiDataDto {
  @ApiProperty({ description: 'Total claims for the current month', type: Number, example: 120 })
  totalClaims: number;

  @ApiProperty({ description: 'Type A claims count', type: Number, example: 45 })
  typeA: number;

  @ApiProperty({ description: 'Type B claims count', type: Number, example: 35 })
  typeB: number;

  @ApiProperty({ description: 'Type C claims count', type: Number, example: 40 })
  typeC: number;

  @ApiProperty({ description: 'Pending approval claims count', type: Number, example: 15 })
  pendingApproval: number;

  @ApiProperty({ description: 'Loss rate for Type A/B (percentage change)', type: Number, example: -16.8 })
  lossRateAb: number;

  @ApiProperty({ description: 'Loss rate for Type C (percentage change)', type: Number, example: -11.2 })
  lossRateC: number;
}

export class KpiResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'KPI retrieved successfully' })
  message: string;

  @ApiProperty({ type: KpiDataDto })
  data: KpiDataDto;
}
