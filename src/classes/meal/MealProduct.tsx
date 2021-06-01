import { IMealProduct } from "./IMealProduct";
import { IProduct } from "../product/IProduct";
import { PortionType } from "../productCarbs/PortionType";
import { uuidv4 } from "../../utils/helper";
import { ProductCategoryType } from "../productCategory/ProductCategoryType";
import { UnitsType } from "../units/UnitsType";
import { ProductCarbs } from "../productCarbs/ProductCarbs";

export class MealProduct implements IMealProduct {
  id: string = uuidv4();
  name: string;
  categories: ProductCategoryType[];
  units: UnitsType;
  carbsData: ProductCarbs;
  mealProductCarbs: ProductCarbs;
  portionType: PortionType;
  portionTypeInUse: PortionType;

  constructor(product: IProduct) {
    this.name = product.name;
    this.categories = product.categories;
    this.units = product.units;
    this.carbsData = product.carbsData;
    this.mealProductCarbs = product.carbsData;
    this.portionType = product.portionType;
    this.portionTypeInUse = product.portionType;
  }
}