import { Product } from "../../../../classes/product/Product";

export enum ListProductActions {
  LIST_PRODUCT_SHOW = "LIST_PRODUCT_SHOW",
  LIST_PRODUCT_CALC = "LIST_PRODUCT_CALC",
  LIST_PRODUCT_CLOSE = "LIST_PRODUCT_CLOSE",
  LIST_PRODUCT_CONFIRM_DELETE = "LIST_PRODUCT_CONFIRM_DELETE",
}

export interface ShowProduct {
  type: ListProductActions.LIST_PRODUCT_SHOW;
  product: Product;
}

export interface CalculateProduct {
  type: ListProductActions.LIST_PRODUCT_CALC;
  product: Product;
}

export interface CloseProduct {
  type: ListProductActions.LIST_PRODUCT_CLOSE;
}

export interface ConfirmDeleteProduct {
  type: ListProductActions.LIST_PRODUCT_CONFIRM_DELETE;
  product: Product;
}
