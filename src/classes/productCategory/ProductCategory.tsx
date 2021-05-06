import { IProductCategory } from "./IProductCategory";
import { ProductCategoryType } from "./ProductCategoryType";

export class ProductCategory implements IProductCategory {
  type: ProductCategoryType;

  constructor(type: ProductCategoryType) {
    this.type = type;
  }
}
