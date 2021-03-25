import { combineReducers, Reducer } from 'redux';
import { mealsReducer, MealsState } from './mealsReducer';
import productsState, { ProductsState } from './productsReducer';

export interface AppState {
  mealsState: MealsState,
  productsState: Reducer<ProductsState>,
}

export default combineReducers({
  mealsState: mealsReducer,
});
