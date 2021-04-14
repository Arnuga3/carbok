import { combineReducers } from 'redux';
import { appSettingsReducer, AppSettingsState } from './appSettingsReducer';
import { mealsReducer, MealsState } from './mealsReducer';
import { productsReducer, ProductsState } from './productsReducer';

export interface AppState {
  appSettingsState: AppSettingsState,
  mealsState: MealsState,
  productsState: ProductsState,
}

export default combineReducers({
  appSettingsState: appSettingsReducer,
  mealsState: mealsReducer,
  productsState: productsReducer,
});
