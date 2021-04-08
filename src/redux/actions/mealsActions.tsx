import { Dispatch } from "redux";
import { IMeal } from "../../classes/meal/IMeal";
import { MealsStorageService } from "../../services/mealsStorageService";

export enum MealsActions {
    ADD_MEAL = 'ADD_MEAL',
    ADD_MEALS = 'ADD_MEALS',
}

export type MealsActionType = AddMeal | AddMeals;

interface AddMeal {
    type: MealsActions.ADD_MEAL,
    meal: IMeal,
}

interface AddMeals {
    type: MealsActions.ADD_MEALS,
    date: Date,
    meals: IMeal[],
}

export const storeMeal = (meal: IMeal): AddMeal => ({type: MealsActions.ADD_MEAL, meal});
export const storeMeals = (date: Date, meals: IMeal[]): AddMeals => ({type: MealsActions.ADD_MEALS, date, meals});

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
          dispatch(storeMeals(date, meals));
        }
      } catch (e) {
        console.log(e);
      }
    };
  };