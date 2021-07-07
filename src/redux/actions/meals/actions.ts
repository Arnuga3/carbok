import { Dispatch } from "redux";
import { Meal } from "../../../classes/meal/Meal";
import { uuidv4 } from "../../../utils/helpers";
import {
  AddMeal,
  MealsActions,
  AddMeals,
  UpdateMeal,
  DeleteMeal,
  ChangeDate,
} from "./interfaces";
import { dataService } from "../../../services/DataService";
import { dateService } from "../../../services/DateService";

export const storeMeal = (meal: Meal): AddMeal => ({
  type: MealsActions.ADD_MEAL,
  meal,
});

export const storeMeals = (meals: Meal[]): AddMeals => ({
  type: MealsActions.ADD_MEALS,
  meals,
});

export const updateStoredMeal = (meal: Meal): UpdateMeal => ({
  type: MealsActions.UPDATE_MEAL,
  meal,
});

export const deleteStoredMeal = (meal: Meal): DeleteMeal => ({
  type: MealsActions.DELETE_MEAL,
  meal,
});

export const changeStoredDate = (date: Date): ChangeDate => ({
  type: MealsActions.CHANGE_DATE,
  date,
});

export function addMeal(meal: Meal) {
  return async (dispatch: Dispatch) => {
    try {
      await dataService.addMeal(meal);
      dispatch(storeMeal(meal));
    } catch (e) {
      console.log(e);
    }
  };
}

export const retrieveMeals = (date: Date) => {
  return async (dispatch: Dispatch) => {
    try {
      const meals = await dataService.retrieveMeals(date);
      if (meals && meals.length > 0) {
        dispatch(storeMeals(meals));
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const updateMeal = (meal: Meal) => {
  return async (dispatch: Dispatch) => {
    try {
      await dataService.updateMeal(meal);
      dispatch(updateStoredMeal(meal));
    } catch (e) {
      console.log(e);
    }
  };
};

export const updateMeals = (meals: Meal[]) => {
  return async (dispatch: Dispatch) => {
    try {
      const mealsOrdered = meals.map((meal, idx) => ({
        ...meal,
        order: idx,
      }));
      await dataService.updateMeals(mealsOrdered);
      dispatch(storeMeals(mealsOrdered));
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteMeal = (meal: Meal) => {
  return async (dispatch: Dispatch) => {
    try {
      await dataService.deleteMeal(meal.id);
      dispatch(deleteStoredMeal(meal));
    } catch (e) {
      console.log(e);
    }
  };
};

export const changeDate = (date: Date) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(changeStoredDate(date));
      const meals = await dataService.retrieveMeals(date);
      if (meals && meals.length > 0) {
        dispatch(storeMeals(meals));
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const copyMeal = (date: Date, meal: Meal) => {
  return async (dispatch: Dispatch) => {
    try {
      const productsCopy = meal.products.map((product) => ({
        ...product,
        id: uuidv4(),
      }));
      await dataService.addMeal(new Meal(meal.type, dateService.dateNoTime(date), productsCopy, 0));
      dispatch(changeStoredDate(date));
    } catch (e) {
      console.log(e);
    }
  };
};
