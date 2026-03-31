export declare class DocumentListItemDto {
    id: string;
    claimId: string;
    docType: string;
    title: string;
    status: string | null;
    fileUrl: string | null;
    complexName: string | null;
    createdAt: Date;
}
export declare class DocumentListDataDto {
    items: DocumentListItemDto[];
    totalCount: number;
    page: number;
    totalPages: number;
}
export declare class DocumentListResponseDto {
    success: boolean;
    message: string;
    data: DocumentListDataDto;
}
