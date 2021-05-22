import { Dispatch } from "redux";
import { IProduct } from "../../classes/product/IProduct";
import { transformToIProducts } from "../../database/productTransformer";
import { ProductsStorageService } from "../../services/ProductsStorageService";
import { db } from "./../../database/CarbokDB";

export enum ProductsActions {
  ADD_PRODUCT = "ADD_PRODUCT",
  ADD_PRODUCTS = "ADD_PRODUCTS",
  UPDATE_PRODUCT = "UPDATE_PRODUCT",
  DELETE_PRODUCT = "DELETE_PRODUCT",
  FETCHING_START = "FETCHING_START",
  SET_SEARCH_STRING = "SET_SEARCH_STRING",
}

export type ProductsActionType = AddProduct | AddProducts;

interface AddProduct {
  type: ProductsActions.ADD_PRODUCT;
  product: IProduct;
}

interface AddProducts {
  type: ProductsActions.ADD_PRODUCTS;
  products: IProduct[];
}

interface UpdateProduct {
  type: ProductsActions.UPDATE_PRODUCT;
  product: IProduct;
}

interface DeleteProduct {
  type: ProductsActions.DELETE_PRODUCT;
  id: string;
}

interface FetchingStart {
  type: ProductsActions.FETCHING_START;
}

interface SetSearchString {
  type: ProductsActions.SET_SEARCH_STRING;
  searchString: string | null;
}

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

export const retrieveProducts = (
  limit: number,
  offset: number,
  searchText: string | null = null
) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(fetchingStart());

      if (searchText) {
        const regex = new RegExp(searchText);
        await db.products
          .filter((prod) => regex.test(prod.name.toLowerCase()))
          .offset(offset)
          .limit(limit)
          .toArray()
          .then((products) => dispatch(
            storeProducts(transformToIProducts(products))
          ));
      } else {
        await db.products
          .orderBy("name")
          .offset(offset)
          .limit(limit)
          .toArray()
          .then((products) => dispatch(
            storeProducts(transformToIProducts(products))
          ));
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export function addProduct(product: IProduct) {
  return async (dispatch: Dispatch) => {
    try {
      const prodStorageSvc = new ProductsStorageService();
      await prodStorageSvc.save(product);
      dispatch(storeProduct(product));
    } catch (e) {
      console.log(e);
    }
  };
}

export function updateProduct(product: IProduct) {
  return async (dispatch: Dispatch) => {
    try {
      const prodStorageSvc = new ProductsStorageService();
      await prodStorageSvc.update(product);
      dispatch(updateStoredProduct(product));
    } catch (e) {
      console.log(e);
    }
  };
}

export function deleteProduct(id: string) {
  return async (dispatch: Dispatch) => {
    try {
      const prodStorageSvc = new ProductsStorageService();
      await prodStorageSvc.remove(id);
      dispatch(deleteStoredProduct(id));
    } catch (e) {
      console.log(e);
    }
  };
}

export const importProducts = (products: IProduct[]) => {
  return async (dispatch: Dispatch) => {
    try {
      const prodStorageSvc = new ProductsStorageService();
      await prodStorageSvc.importData(products);
      dispatch(storeProducts(products));
    } catch (e) {
      console.log(e);
    }
  };
};
