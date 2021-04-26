import { Dispatch } from "redux";
import { IMeal } from "../../classes/meal/IMeal";
import { Meal } from "../../classes/meal/Meal";
import { MealsStorageService } from "../../services/MealsStorageService";
import { uuidv4 } from "../../utils/helper";

export enum MealsActions {
  ADD_MEAL = "ADD_MEAL",
  ADD_MEALS = "ADD_MEALS",
  UPDATE_MEAL = "UPDATE_MEAL",
  DELETE_MEAL = "DELETE_MEAL",
  CHANGE_DATE = "CHANGE_DATE",
}

export type MealsActionType =
  | AddMeal
  | AddMeals
  | UpdateMeal
  | DeleteMeal
  | ChangeDate;

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

interface DeleteMeal {
  type: MealsActions.DELETE_MEAL;
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

export const updateMeals = (date: Date, meals: IMeal[]) => {
  return async (dispatch: Dispatch) => {
    try {
      const mealsStorageSvc = new MealsStorageService();
      await mealsStorageSvc.updateAllForDate(date, meals);
      dispatch(storeMeals(meals));
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteMeal = (meal: IMeal) => {
  return async (dispatch: Dispatch) => {
    try {
      const mealsStorageSvc = new MealsStorageService();
      await mealsStorageSvc.remove(meal);
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

export const copyMeal = (date: Date, meal: IMeal) => {
  return async (dispatch: Dispatch) => {
    try {
      const mealsStorageSvc = new MealsStorageService();
      const productsCopy = meal.products.map((product) => ({
        ...product,
        id: uuidv4(),
      }));
      const mealCopy = new Meal(meal.type, date, productsCopy);
      await mealsStorageSvc.saveToDate(date, mealCopy);
      dispatch(changeStoredDate(date));
    } catch (e) {
      console.log(e);
    }
  };
};
