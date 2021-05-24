import { IMeal } from "../../../classes/meal/IMeal";

export enum MealsActions {
  ADD_MEAL = "ADD_MEAL",
  ADD_MEALS = "ADD_MEALS",
  UPDATE_MEAL = "UPDATE_MEAL",
  DELETE_MEAL = "DELETE_MEAL",
  CHANGE_DATE = "CHANGE_DATE",
}

export interface AddMeal {
  type: MealsActions.ADD_MEAL;
  meal: IMeal;
}

export interface AddMeals {
  type: MealsActions.ADD_MEALS;
  meals: IMeal[];
}

export interface UpdateMeal {
  type: MealsActions.UPDATE_MEAL;
  meal: IMeal;
}

export interface DeleteMeal {
  type: MealsActions.DELETE_MEAL;
  meal: IMeal;
}

export interface ChangeDate {
  type: MealsActions.CHANGE_DATE;
  date: Date;
}
