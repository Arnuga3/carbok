import { combineReducers } from 'redux';
import { appSettingsReducer, AppSettingsState } from './appSettingsReducer';
import { mealsReducer, MealsState } from './mealsReducer';
import { productsReducer, ProductsState } from './products/productsReducer';
import { listProductReducer, ListProductState } from './products/listProductReducer';

export interface AppState {
  appSettingsState: AppSettingsState,
  mealsState: MealsState,
  productsState: ProductsState,
  listProductState: ListProductState,
}

export default combineReducers({
  appSettingsState: appSettingsReducer,
  mealsState: mealsReducer,
  productsState: productsReducer,
  listProductState: listProductReducer,
});
