import { DashboardService } from './dashboard.service';
import { ApiResponseDto } from '@/common/dto/api-response.dto';
import { KpiResponseDto } from './dto/kpi-response.dto';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getKpi(): Promise<ApiResponseDto<KpiResponseDto['data']>>;
}
