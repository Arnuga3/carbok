import { Dispatch } from "redux";
import { IMeal } from "../../classes/meal/IMeal";
import { MealsStorageService } from "../../services/MealsStorageService";

export enum MealsActions {
  ADD_MEAL = "ADD_MEAL",
  ADD_MEALS = "ADD_MEALS",
  UPDATE_MEAL = "UPDATE_MEAL",
  CHANGE_DATE = "CHANGE_DATE",
}

export type MealsActionType = AddMeal | AddMeals | UpdateMeal | ChangeDate;

interface AddMeal {
  type: MealsActions.ADD_MEAL;
  meal: IMeal;
}

interface AddMeals {
  type: MealsActions.ADD_MEALS;
  meals: IMeal[];
}

interface UpdateMeal {
  type: MealsActions.UPDATE_MEAL;
  meal: IMeal;
}

interface ChangeDate {
  type: MealsActions.CHANGE_DATE;
  date: Date;
}

export const storeMeal = (meal: IMeal): AddMeal => ({
  type: MealsActions.ADD_MEAL,
  meal,
});

export const storeMeals = (meals: IMeal[]): AddMeals => ({
  type: MealsActions.ADD_MEALS,
  meals,
});

export const updateStoredMeal = (meal: IMeal): UpdateMeal => ({
  type: MealsActions.UPDATE_MEAL,
  meal,
});

export const changeStoredDate = (date: Date): ChangeDate => ({
  type: MealsActions.CHANGE_DATE,
  date,
});

export function addMeal(meal: IMeal) {
  return async (dispatch: Dispatch) => {
    try {
      const mealsStorageSvc = new MealsStorageService();
      await mealsStorageSvc.save(meal);
      dispatch(storeMeal(meal));
    } catch (e) {
      console.log(e);
    }
  };
}

export const retrieveMeals = (date: Date) => {
  return async (dispatch: Dispatch) => {
    try {
      const mealsStorageSvc = new MealsStorageService();
      const meals = await mealsStorageSvc.getAllForDate(date);
      if (meals) {
        dispatch(storeMeals(meals));
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const updateMeal = (meal: IMeal) => {
  return async (dispatch: Dispatch) => {
    try {
      const mealsStorageSvc = new MealsStorageService();
      await mealsStorageSvc.update(meal.dateTime, meal);
      dispatch(updateStoredMeal(meal));
    } catch (e) {
      console.log(e);
    }
  };
};

export const changeDate = (date: Date) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(changeStoredDate(date));
      const mealsStorageSvc = new MealsStorageService();
      const meals = await mealsStorageSvc.getAllForDate(date);
      if (meals) {
        dispatch(storeMeals(meals));
      }
    } catch (e) {
      console.log(e);
    }
  };
};