import { combineReducers } from 'redux';
import { mealsReducer, MealsState } from './mealsReducer';
import { productsReducer, ProductsState } from './productsReducer';

export interface AppState {
  mealsState: MealsState,
  productsState: ProductsState,
}

export default combineReducers({
  mealsState: mealsReducer,
  productsState: productsReducer,
});
