import { MealType } from "../enums/MealType";

export interface Meal {
    id: string;
    type: MealType;
    dateTime: Date;
    products: [];
}