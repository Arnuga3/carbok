import { Reducer } from "redux";
import { Product } from "../../classes/product/Product";
import { ProductsActions } from "../actions/products/interfaces";
import _ from "lodash";

export interface ProductsState {
  products: Product[] | null;
  searchString: string | null;
  fetching: boolean;
}

const defaultState: ProductsState = {
  products: null,
  searchString: null,
  fetching: false,
};

const reducer: Reducer<ProductsState> = (
  state: ProductsState = defaultState,
  action
) => {
  switch (action.type) {
    case ProductsActions.ADD_PRODUCT:
      const productsUpdated = [...(state.products ?? []), action.product];
      return {
        ...state,
        products: _.sortBy(productsUpdated, ["name", "standard"]),
      };

    case ProductsActions.ADD_PRODUCTS:
      return {
        ...state,
        products: action.products,
        fetching: false,
      };

    case ProductsActions.UPDATE_PRODUCT:
      if (state.products) {
        return {
          ...state,
          products: state.products.map((product) =>
            product.id === action.product.id
              ? { ...product, ...action.product }
              : product
          ),
        };
      }
      return state;

    case ProductsActions.DELETE_PRODUCT:
      if (state.products) {
        return {
          ...state,
          products: state.products.filter(
            (product) => product.id !== action.id
          ),
        };
      }
      return state;

    case ProductsActions.SET_SEARCH_STRING:
      return {
        ...state,
        products: null,
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
