import { Reducer } from "redux";
import { IMeal } from "../../classes/meal/IMeal";
import { MealsActions } from "../actions/mealsActions";

export interface MealsState {
  meals: IMeal[];
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
