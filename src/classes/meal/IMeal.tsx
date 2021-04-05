import { MealType } from "./MealTypeEnum";
import { IProduct } from "../product/IProduct";

export interface IMeal {
    id: string;
    type: MealType;
    dateTime: Date;
    products: IProduct[];
}