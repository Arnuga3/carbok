import {
  ShowProduct,
  CalculateProduct,
  CloseProduct,
  ConfirmDeleteProduct,
  ListProductActions,
} from "./interfaces/listProductInterfaces";
import { Product } from "../../../classes/product/Product";

export const showProduct = (product: Product): ShowProduct => ({
  type: ListProductActions.LIST_PRODUCT_SHOW,
  product,
});

export const calculateProduct = (product: Product): CalculateProduct => ({
  type: ListProductActions.LIST_PRODUCT_CALC,
  product,
});

export const confirmDeleteProduct = (product: Product): ConfirmDeleteProduct => ({
  type: ListProductActions.LIST_PRODUCT_CONFIRM_DELETE,
  product,
});

export const closeProduct = (): CloseProduct => ({
  type: ListProductActions.LIST_PRODUCT_CLOSE,
});
