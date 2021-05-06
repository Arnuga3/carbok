import { MealTypeEnum } from "../classes/meal/MealTypeEnum";

export const mealTypes = [
  MealTypeEnum.BREAKFAST,
  MealTypeEnum.LUNCH,
  MealTypeEnum.DINNER,
  MealTypeEnum.SNACK,
  MealTypeEnum.OTHER,
];

export function getMealKey(type: string): string {
  return `meal.type.${type.toLowerCase()}`;
}
