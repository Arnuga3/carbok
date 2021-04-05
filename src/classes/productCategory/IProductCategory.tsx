import { ProductCategoryType } from "./ProductCategoryType";

export interface IProductCategory {
    type: ProductCategoryType;
    nameKey: string;
    descriptionKey: string;
    color: string;
}