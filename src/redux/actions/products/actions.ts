import { Dispatch } from "redux";
import { IProduct } from "../../../classes/product/IProduct";
import {
  AddProduct,
  ProductsActions,
  AddProducts,
  UpdateProduct,
  DeleteProduct,
  FetchingStart,
  SetSearchString,
} from "./interfaces";
import { dataService } from "../../../services/DataService";

const storeProduct = (product: IProduct): AddProduct => ({
  type: ProductsActions.ADD_PRODUCT,
  product,
});

const storeProducts = (products: IProduct[]): AddProducts => ({
  type: ProductsActions.ADD_PRODUCTS,
  products,
});

const updateStoredProduct = (product: IProduct): UpdateProduct => ({
  type: ProductsActions.UPDATE_PRODUCT,
  product,
});

const deleteStoredProduct = (id: string): DeleteProduct => ({
  type: ProductsActions.DELETE_PRODUCT,
  id,
});

const fetchingStart = (): FetchingStart => ({
  type: ProductsActions.FETCHING_START,
});

export const setSearchString = (
  searchString: string | null
): SetSearchString => ({
  type: ProductsActions.SET_SEARCH_STRING,
  searchString,
});

export const retrieveProducts = (searchText: string | null = null) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(fetchingStart());
      dispatch(storeProducts(await dataService.retrieveProducts(searchText)));
    } catch (e) {
      console.log(e);
    }
  };
};

export function addProduct(product: IProduct) {
  return async (dispatch: Dispatch) => {
    try {
      await dataService.addProduct(product);
      dispatch(storeProduct(product));
    } catch (e) {
      console.log(e);
    }
  };
}

export function updateProduct(product: IProduct) {
  return async (dispatch: Dispatch) => {
    try {
      await dataService.updateProduct(product);
      dispatch(updateStoredProduct(product));
    } catch (e) {
      console.log(e);
    }
  };
}

export function deleteProduct(id: string) {
  return async (dispatch: Dispatch) => {
    try {
      dataService.deleteProduct(id);
      dispatch(deleteStoredProduct(id));
    } catch (e) {
      console.log(e);
    }
  };
}
