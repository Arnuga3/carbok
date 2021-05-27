import { Reducer } from "redux";
import { IProduct } from "../../classes/product/IProduct";
import { ProductsActions } from "../actions/products/interfaces";

export interface ProductsState {
  products: IProduct[];
  searchString: string | null;
  fetching: boolean;
}

const defaultState: ProductsState = {
  products: [],
  searchString: null,
  fetching: false,
};

const reducer: Reducer<ProductsState> = (
  state: ProductsState = defaultState,
  action
) => {
  switch (action.type) {
    case ProductsActions.ADD_PRODUCT:
      const productsUpdated = [...state.products, action.product].sort((a, b) => a.name - b.name);
      return {
        ...state,
        products: productsUpdated,
      };

    case ProductsActions.ADD_PRODUCTS:
      return {
        ...state,
        products: action.products,
        fetching: false,
      };

    case ProductsActions.UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.product.id
            ? { ...product, ...action.product }
            : product
        ),
      };

    case ProductsActions.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.id),
      };

      
    case ProductsActions.SET_SEARCH_STRING:
      return {
        ...state,
        products: [],
        searchString: action.searchString,
      };

    case ProductsActions.FETCHING_START:
      return {
        ...state,
        fetching: true,
      };

    default:
      return state;
  }
};

export { reducer as productsReducer };
