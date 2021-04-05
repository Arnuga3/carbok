import { Reducer } from 'redux';
import { IMeal } from '../../classes/meal/IMeal';
import { MealsActions } from '../actions/mealsActions';

export interface MealsState {
  meals: IMeal[];
}

const defaultState: MealsState = {
  meals: [],
};

const reducer: Reducer<MealsState> = (state: MealsState = defaultState, action) => {
  switch (action.type) {

    case MealsActions.ADD_MEAL:
      return {
        meals: [...state.meals, action.meal],
      };
      
    default:
      return state;
  }
};

export { reducer as mealsReducer };