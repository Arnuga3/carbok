import { Dispatch } from "redux";
import { IProduct } from "../../classes/product/IProduct";
import { ProductsStorageService } from "../../services/productsStorageService";

export enum ProductsActions {
  ADD_PRODUCT = "ADD_PRODUCT",
  ADD_PRODUCTS = "ADD_PRODUCTS",
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

const storeProduct = (product: IProduct): AddProduct => ({
  type: ProductsActions.ADD_PRODUCT,
  product,
});

const storeProducts = (products: IProduct[]): AddProducts => ({
  type: ProductsActions.ADD_PRODUCTS,
  products,
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
