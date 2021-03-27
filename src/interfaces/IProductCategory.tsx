import { ProductCategoryType } from "../types/ProductCategoryType";

export interface IProductCategory {
    type: ProductCategoryType;
    nameKey: string;
    descriptionKey: string;
    color: string;
}