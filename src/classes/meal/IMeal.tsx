import { MealTypeEnum } from "./MealTypeEnum";
import { IMealProduct } from "./IMealProduct";

export interface IMeal {
    id: string;
    type: MealTypeEnum;
    dateTime: Date;
    products: IMealProduct[];
    note?: string;
}