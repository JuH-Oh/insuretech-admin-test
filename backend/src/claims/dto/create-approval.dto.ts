import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Decision } from '@/approvals/entity/approval.entity';

export class CreateApprovalDto {
  @ApiProperty({ description: 'Approval decision', enum: Decision, example: Decision.APPROVE })
  @IsEnum(Decision)
  decision: Decision;

  @ApiPropertyOptional({ description: 'Approved amount (required for approve/modify)', type: Number, example: 5000000 })
  @IsOptional()
  @IsNumber()
  approvedAmount?: number;

  @ApiPropertyOptional({ description: 'Comment or reason for the decision', type: String, example: 'Approved after review' })
  @IsOptional()
  @IsString()
  comment?: string;
}
