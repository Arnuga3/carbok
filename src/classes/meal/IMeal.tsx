import { IMealType } from "../mealType/IMealType";
import { IProduct } from "../product/IProduct";

export interface IMeal {
    id: string;
    type: IMealType;
    dateTime: Date;
    products: IProduct[];
    note?: string;
}