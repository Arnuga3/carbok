import { IProductCategory } from "./IProductCategory";
import { ProductCategoryType } from "./ProductCategoryType";

export class ProductCategory implements IProductCategory {
  type: ProductCategoryType;
  nameKey: string;
  descriptionKey: string;

  constructor(
    type: ProductCategoryType,
    nameKey: string,
    descriptionKey: string,
  ) {
    this.type = type;
    this.nameKey = nameKey;
    this.descriptionKey = descriptionKey;
  }
}
