import { IProduct } from "../interfaces/IProduct";
import { ProductCategoryType } from "./ProductCategoryType";

export type CategoryProductsMapType = Record<ProductCategoryType, IProduct[]>;
