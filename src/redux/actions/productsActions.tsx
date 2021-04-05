import { Dispatch } from "redux";
import { IProduct } from "../../interfaces/IProduct";
import { ProductsStorage } from "../../storage/productsStorage";

export enum ProductsActions {
  ADD_PRODUCT = "ADD_PRODUCT",
  ADD_PRODUCTS = "ADD_PRODUCTS",
}

interface AddProduct {
  type: ProductsActions.ADD_PRODUCT;
  product: IProduct;
}

interface AddProducts {
  type: ProductsActions.ADD_PRODUCTS;
  products: IProduct[];
}

export const retrieveProducts = () => {
  return async (dispatch: Dispatch) => {
    try {
      const products = await ProductsStorage.getAll();
      if (products) {
        dispatch(storeProducts(products));
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const storeProducts = (products: IProduct[]): AddProducts => ({
  type: ProductsActions.ADD_PRODUCTS,
  products,
});

export function addProduct(product: IProduct) {
  return async (dispatch: Dispatch) => {
    try {
      await ProductsStorage.save(product);
      dispatch(storeProduct(product));
    } catch (e) {
      console.log(e);
    }
  };
}

const storeProduct = (product: IProduct): AddProduct => ({
  type: ProductsActions.ADD_PRODUCT,
  product,
});

export type ProductsActionType = AddProduct | AddProducts;
