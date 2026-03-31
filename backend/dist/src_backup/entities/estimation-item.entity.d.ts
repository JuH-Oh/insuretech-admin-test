import { Estimation } from './estimation.entity';
export declare enum StandardSource {
    STANDARD_COST = "standard_cost",
    PRICE_INDEX = "price_index"
}
export declare class EstimationItem {
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
    createdAt: Date;
    updatedAt: Date;
    estimation: Estimation;
}
