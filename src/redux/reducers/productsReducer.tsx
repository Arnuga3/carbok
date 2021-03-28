import { Reducer } from "redux";
import { IProduct } from "../../interfaces/IProduct";
import { ProductsActions } from "../actions/productsActions";

export interface ProductsState {
  products: IProduct[];
}

const defaultState: ProductsState = {
  products: [],
};

const reducer: Reducer<ProductsState> = (state: ProductsState = defaultState, action) => {
  switch (action.type) {

    case ProductsActions.ADD_PRODUCT:
      return {
        products: [...state.products, action.product],
      };

    default:
      return state;
  }
};

export {reducer as productsReducer};
