import { MealType } from "../enums/MealType";

export interface Meal {
    type: MealType,
    dateTime: Date,
    products: []
}