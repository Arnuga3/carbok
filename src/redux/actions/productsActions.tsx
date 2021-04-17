import { Dispatch } from "redux";
import { IProduct } from "../../classes/product/IProduct";
import { ProductsStorageService } from "../../services/ProductsStorageService";

export enum ProductsActions {
  ADD_PRODUCT = "ADD_PRODUCT",
  ADD_PRODUCTS = "ADD_PRODUCTS",
  UPDATE_PRODUCT = "UPDATE_PRODUCT",
  DELETE_PRODUCT = "DELETE_PRODUCT",
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

export const retrieveProducts = () => {
  return async (dispatch: Dispatch) => {
    try {
      const prodStorageSvc = new ProductsStorageService();
      const products = await prodStorageSvc.getAll();
      if (products) {
        dispatch(storeProducts(products));
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
