import { BaseEntity } from '@/common/entity/base.entity';
import { Estimation } from './estimation.entity';
export declare enum StandardSource {
    STANDARD_COST = "standard_cost",
    PRICE_INDEX = "price_index"
}
export declare class EstimationItem extends BaseEntity {
    id: number;
    estimationId: string;
    name: string;
    description: string | null;
    quantity: number;
    unit: string;
    standardSrc: StandardSource | null;
    subtotal: number;
    isSelected: boolean;
    sortOrder: number;
    estimation: Estimation;
}
