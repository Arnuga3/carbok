import { Reducer } from "redux";
import { IMeal } from "../../classes/meal/IMeal";
import { getDateString } from "../../utils/helper";
import { MealsActions } from "../actions/mealsActions";

export interface MealsState {
  mealsAll: { [prop: string]: IMeal[] };
  meals: IMeal[];
  date: Date;
}

const defaultState: MealsState = {
  mealsAll: {},
  meals: [],
  date: new Date(),
};

const reducer: Reducer<MealsState> = (
  state: MealsState = defaultState,
  action
) => {
  const dateKey = getDateString(state.date);

  switch (action.type) {
    case MealsActions.ADD_MEAL:
      return {
        ...state,
        meals: [...state.meals, action.meal],
        mealsAll: {
          ...state.mealsAll,
          [dateKey]: state.mealsAll[dateKey]
            ? [...state.mealsAll[dateKey], action.meal]
            : [action.meal],
        },
      };

    case MealsActions.ADD_MEALS:
      return {
        ...state,
        meals: action.meals,
        mealsAll: {
          ...state.mealsAll,
          [dateKey]: state.mealsAll[dateKey]
            ? [...state.mealsAll[dateKey], ...action.meals]
            : [...action.meals],
        },
      };

    default:
      return state;
  }
};

export { reducer as mealsReducer };
