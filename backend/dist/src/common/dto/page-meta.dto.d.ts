interface IPageMetaDtoParameters {
    itemCount: number;
    pageOptionsDto: any;
}
export declare class PageMetaDto {
    readonly page: number;
    readonly limit: number;
    readonly totalCount: number;
    readonly totalPages: number;
    constructor({ itemCount, pageOptionsDto }: IPageMetaDtoParameters);
}
export {};
