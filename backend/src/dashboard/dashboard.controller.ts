import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { ApiResponseDto } from '@/common/dto/api-response.dto';
import { Public } from '@/auth/decorators/public.decorator';
import { KpiResponseDto } from './dto/kpi-response.dto';

@ApiTags('Dashboard')
@ApiBearerAuth()
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Public()
  @Get('kpi')
  @ApiOperation({ summary: 'Get monthly KPI metrics for the current month' })
  @ApiResponse({ status: 200, description: 'KPI retrieved successfully', type: KpiResponseDto })
  async getKpi(): Promise<ApiResponseDto<KpiResponseDto['data']>> {
    const data = await this.dashboardService.getMonthlyKpi();
    return new ApiResponseDto(true, 'KPI retrieved successfully', data);
  }
}
