import { MealType } from "../classes/mealType/MealType";
import { MealTypeEnum } from "../classes/mealType/MealTypeEnum";

export const mealTypes = [
    new MealType(MealTypeEnum.BREAKFAST, ""),
    new MealType(MealTypeEnum.LUNCH, ""),
    new MealType(MealTypeEnum.DINNER, ""),
    new MealType(MealTypeEnum.SNACK, ""),
    new MealType(MealTypeEnum.OTHER, ""),
];