import { MealType } from "../classes/mealType/MealType";
import { MealTypeEnum } from "../classes/mealType/MealTypeEnum";

export const mealTypes = [
    new MealType(MealTypeEnum.BREAKFAST, "meal.type.breakfast"),
    new MealType(MealTypeEnum.LUNCH, "meal.type.lunch"),
    new MealType(MealTypeEnum.DINNER, "meal.type.dinner"),
    new MealType(MealTypeEnum.SNACK, "meal.type.snack"),
    new MealType(MealTypeEnum.OTHER, "meal.type.other"),
];
