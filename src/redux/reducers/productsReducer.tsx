import { Reducer } from "redux";
import { IProduct } from "../../interfaces/IProduct";

export interface ProductsState {
  products: IProduct[];
}

const defaultState: ProductsState = {
  products: [],
};

const reducer: Reducer<ProductsState> = (state: ProductsState = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export {reducer as productsReducer};
