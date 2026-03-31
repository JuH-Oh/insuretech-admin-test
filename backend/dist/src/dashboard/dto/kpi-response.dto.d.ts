export declare class KpiDataDto {
    totalClaims: number;
    typeA: number;
    typeB: number;
    typeC: number;
    pendingApproval: number;
    lossRateAb: number;
    lossRateC: number;
}
export declare class KpiResponseDto {
    success: boolean;
    message: string;
    data: KpiDataDto;
}
