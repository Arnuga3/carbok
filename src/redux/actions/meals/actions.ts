import { Dispatch } from "redux";
import { IMeal } from "../../../classes/meal/IMeal";
import { Meal } from "../../../classes/meal/Meal";
import { MealsStorageService } from "../../../services/MealsStorageService";
import { getDateOnly, uuidv4 } from "../../../utils/helper";
import {
  AddMeal,
  MealsActions,
  AddMeals,
  UpdateMeal,
  DeleteMeal,
  ChangeDate,
} from "./interfaces";
import { dataService } from "../../../services/DataService";

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

export const deleteStoredMeal = (meal: IMeal): DeleteMeal => ({
  type: MealsActions.DELETE_MEAL,
  meal,
});

export const changeStoredDate = (date: Date): ChangeDate => ({
  type: MealsActions.CHANGE_DATE,
  date,
});

export function addMeal(meal: IMeal) {
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

export const updateMeal = (meal: IMeal) => {
  return async (dispatch: Dispatch) => {
    try {
      await dataService.updateMeal(meal);
      dispatch(updateStoredMeal(meal));
    } catch (e) {
      console.log(e);
    }
  };
};

export const updateMeals = (meals: IMeal[]) => {
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

export const deleteMeal = (meal: IMeal) => {
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

export const copyMeal = (date: Date, meal: IMeal) => {
  return async (dispatch: Dispatch) => {
    try {
      const productsCopy = meal.products.map((product) => ({
        ...product,
        id: uuidv4(),
      }));
      dataService.addMeal(new Meal(meal.type, getDateOnly(date), productsCopy));
      dispatch(changeStoredDate(date));
    } catch (e) {
      console.log(e);
    }
  };
};
//FIXME
export const importMeals = (meals: { [key: string]: IMeal[] }) => {
  return async (dispatch: Dispatch) => {
    try {
      const mealsStorageSvc = new MealsStorageService();
      await mealsStorageSvc.importData(meals);
      const mealsToday = await mealsStorageSvc.getAllForDate(new Date());
      if (mealsToday) {
        dispatch(storeMeals(mealsToday));
      }
    } catch (e) {
      console.log(e);
    }
  };
};