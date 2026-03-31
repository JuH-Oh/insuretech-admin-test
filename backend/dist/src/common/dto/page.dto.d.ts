import { PageMetaDto } from './page-meta.dto';
export declare class PageDto<T> {
    readonly items: T[];
    readonly meta: PageMetaDto;
    constructor(items: T[], meta: PageMetaDto);
}
