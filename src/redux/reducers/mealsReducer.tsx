import { Reducer } from "redux";
import { Meal } from "../../classes/meal/Meal";
import { MealsActions } from "../actions/meals/interfaces";

export interface MealsState {
  meals: Meal[];
  date: Date;
}

const defaultState: MealsState = {
  meals: [],
  date: new Date(),
};

const reducer: Reducer<MealsState> = (
  state: MealsState = defaultState,
  action
) => {
  switch (action.type) {
    case MealsActions.ADD_MEAL:
      return {
        ...state,
        meals: [...state.meals, action.meal],
      };

    case MealsActions.ADD_MEALS:
      return {
        ...state,
        meals: action.meals,
      };

    case MealsActions.UPDATE_MEAL:
      return {
        ...state,
        meals: state.meals.map((meal) =>
          meal.id === action.meal.id ? action.meal : meal
        ),
      };

    case MealsActions.DELETE_MEAL:
      return {
        ...state,
        meals: state.meals.filter((meal) =>
          meal.id !== action.meal.id
        ),
      };

    case MealsActions.CHANGE_DATE:
      return {
        ...state,
        date: action.date,
        meals: [],
      };
    default:
      return state;
  }
};

export { reducer as mealsReducer };
