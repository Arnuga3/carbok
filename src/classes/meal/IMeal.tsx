import { IMealType } from "../mealType/IMealType";
import { IMealProduct } from "./IMealProduct";

export interface IMeal {
    id: string;
    type: IMealType;
    dateTime: Date;
    products: IMealProduct[];
    note?: string;
}