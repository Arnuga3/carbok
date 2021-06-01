import { ProductCategoryType } from "../classes/productCategory/ProductCategoryType";

export const categories: ProductCategoryType[] = ["grains", "fruit", "vegetables", "protein", "dairy", "sweets", "other"];

export function getCatKey(type: string): string {
  return `product.category.${type}`;
}

export function getCatDescKey(type: string): string {
  return `product.category.${type}.description`;
}