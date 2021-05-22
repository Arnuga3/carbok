import { Reducer } from "redux";
import { IProduct } from "../../classes/product/IProduct";
import { ProductsActions } from "../actions/productsActions";

export interface ProductsState {
  products: IProduct[];
  readonly limit: number;
  offset: number;
  searchString: string | null;
  fetching: boolean;
  allFetched: boolean;
}

const defaultState: ProductsState = {
  products: [],
  limit: 50,
  offset: 0,
  searchString: null,
  fetching: false,
  allFetched: false,
};

const reducer: Reducer<ProductsState> = (
  state: ProductsState = defaultState,
  action
) => {
  switch (action.type) {
    case ProductsActions.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.product],
      };

    case ProductsActions.ADD_PRODUCTS:
      return {
        ...state,
        products: [...state.products, ...action.products],
        offset: state.offset + state.limit,
        fetching: false,
        allFetched: action.products.length < state.limit || action.products.length === 0,
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
        offset: 0,
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
