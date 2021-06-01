import { MealProduct } from "./MealProduct";
import { MealTypeEnum } from "./MealTypeEnum";

export interface IMeal {
    id: string;
    type: MealTypeEnum;
    date: Date;
    products: MealProduct[];
    note?: string;
    order: number;
}