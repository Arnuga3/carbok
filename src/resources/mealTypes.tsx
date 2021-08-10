import { MealTypeEnum } from "../classes/meal/MealTypeEnum";

export const mealTypes = [
  MealTypeEnum.BREAKFAST,
  MealTypeEnum.LUNCH,
  MealTypeEnum.DINNER,
  MealTypeEnum.SNACK,
  MealTypeEnum.MUNCHIES,
  MealTypeEnum.FEAST,
  MealTypeEnum.CUSTOM,
];

export function getMealKey(type: string): string {
  return `meal.type.${type.toLowerCase()}`;
}
