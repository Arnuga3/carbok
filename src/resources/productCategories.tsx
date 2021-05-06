import { ProductCategory } from "../classes/productCategory/ProductCategory";

export const categories = [
  new ProductCategory("grains"),
  new ProductCategory("fruit"),
  new ProductCategory("vegetables"),
  new ProductCategory("protein"),
  new ProductCategory("dairy"),
  new ProductCategory("sweets"),
  new ProductCategory("other"),
];

export function getCatKey(type: string): string {
  return `product.category.${type}`;
}

export function getCatDescKey(type: string): string {
  return `product.category.${type}.description`;
}