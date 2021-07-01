import { Dispatch } from "redux";
import {
  AddProduct,
  ProductsActions,
  AddProducts,
  UpdateProduct,
  DeleteProduct,
} from "./interfaces/productInterfaces";
import { dataService } from "../../../services/DataService";
import { Product } from "../../../classes/product/Product";

const storeProduct = (product: Product): AddProduct => ({
  type: ProductsActions.ADD_PRODUCT,
  product,
});

const storeProducts = (products: Product[]): AddProducts => ({
  type: ProductsActions.ADD_PRODUCTS,
  products,
});

const updateStoredProduct = (product: Product): UpdateProduct => ({
  type: ProductsActions.UPDATE_PRODUCT,
  product,
});

const deleteStoredProduct = (id: string): DeleteProduct => ({
  type: ProductsActions.DELETE_PRODUCT,
  id,
});

export const retrieveProducts = (searchText: string | null = null) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(storeProducts(await dataService.retrieveProducts(searchText)));
    } catch (e) {
      console.log(e);
    }
  };
};

export function copyProduct(product: Product) {
  return async (dispatch: Dispatch) => {
    try {
      if (product) {
        const { name, categories, units, carbsData, portionType } = product;
        const productCopy = new Product(
          name,
          categories,
          units,
          carbsData,
          portionType,
          false
        );
        await dataService.addProduct(productCopy);
        dispatch(storeProduct(productCopy));
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export function addProduct(product: Product) {
  return async (dispatch: Dispatch) => {
    try {
      await dataService.addProduct(product);
      dispatch(storeProduct(product));
    } catch (e) {
      console.log(e);
    }
  };
}

export function updateProduct(product: Product) {
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
