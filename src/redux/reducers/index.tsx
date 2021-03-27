import { combineReducers } from 'redux';
import { mealsReducer, MealsState } from './mealsReducer';
import { productsReducer, ProductsState } from './productsReducer';
import { productCategoriesReducer, ProductCategoriesState } from './productCategoriesReducer';

export interface AppState {
  mealsState: MealsState,
  productsState: ProductsState,
  productCategoriesState: ProductCategoriesState;
}

export default combineReducers({
  mealsState: mealsReducer,
  productsState: productsReducer,
  productCategoriesState: productCategoriesReducer,
});
