import { MealTypeEnum } from "./MealTypeEnum";
import { IMealProduct } from "./IMealProduct";

export interface IMeal {
    id: string;
    type: MealTypeEnum;
    date: Date;
    products: IMealProduct[];
    note?: string;
    order: number;
}