export declare class ClaimListItemDto {
    id: string;
    complexName: string;
    description: string;
    claimedAt: Date;
    type: string;
    status: string;
    aiConfidence: number | null;
    amount: number | null;
}
export declare class ClaimListDataDto {
    items: ClaimListItemDto[];
    totalCount: number;
    page: number;
    totalPages: number;
}
export declare class ClaimListResponseDto {
    success: boolean;
    message: string;
    data: ClaimListDataDto;
}
export declare class ClaimDetailResponseDto {
    success: boolean;
    message: string;
    data: Record<string, unknown>;
}
export declare class EstimationResponseDto {
    success: boolean;
    message: string;
    data: Record<string, unknown>;
}
export declare class ApprovalResponseDto {
    success: boolean;
    message: string;
    data: Record<string, unknown>;
}
