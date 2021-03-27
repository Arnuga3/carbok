import { MealType } from "../enums/MealType";
import { IProduct } from "./IProduct";

export interface IMeal {
    id: string;
    type: MealType;
    dateTime: Date;
    products: IProduct[];
}