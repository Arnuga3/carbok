import { IProduct } from "../../../classes/product/IProduct";

export enum ProductsActions {
  ADD_PRODUCT = "ADD_PRODUCT",
  ADD_PRODUCTS = "ADD_PRODUCTS",
  UPDATE_PRODUCT = "UPDATE_PRODUCT",
  DELETE_PRODUCT = "DELETE_PRODUCT",
  FETCHING_START = "FETCHING_START",
  SET_SEARCH_STRING = "SET_SEARCH_STRING",
}

export interface AddProduct {
  type: ProductsActions.ADD_PRODUCT;
  product: IProduct;
}

export interface AddProducts {
  type: ProductsActions.ADD_PRODUCTS;
  products: IProduct[];
}

export interface UpdateProduct {
  type: ProductsActions.UPDATE_PRODUCT;
  product: IProduct;
}

export interface DeleteProduct {
  type: ProductsActions.DELETE_PRODUCT;
  id: string;
}

export interface FetchingStart {
  type: ProductsActions.FETCHING_START;
}

export interface SetSearchString {
  type: ProductsActions.SET_SEARCH_STRING;
  searchString: string | null;
}
