import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateEstimationItemDto {
  @ApiProperty({ description: 'Whether the estimation item is selected', type: Boolean, example: true })
  @IsBoolean()
  isSelected: boolean;
}
