import { DataSource } from 'typeorm';
export interface KpiData {
    totalClaims: number;
    typeA: number;
    typeB: number;
    typeC: number;
    pendingApproval: number;
    lossRateAb: number;
    lossRateC: number;
}
export declare class DashboardService {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    getMonthlyKpi(): Promise<KpiData>;
}
