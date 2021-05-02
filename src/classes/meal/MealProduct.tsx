import { IProductCategory } from "../productCategory/IProductCategory";
import { IUnits } from "../units/IUnits";
import { ICarbs } from "../productCarbs/ICarbs";
import { IMealProduct } from "./IMealProduct";
import { IProduct } from "../product/IProduct";
import { PortionType } from "../productCarbs/PortionType";
import { uuidv4 } from "../../utils/helper";

export class MealProduct implements IMealProduct {
  id: string = uuidv4();
  name: string;
  category: IProductCategory;
  units: IUnits;
  carbsData: ICarbs;
  mealProductCarbs: ICarbs;
  portionType: PortionType;
  portionTypeInUse: PortionType;

  constructor(product: IProduct) {
    this.name = product.name;
    this.category = product.category;
    this.units = product.units;
    this.carbsData = product.carbsData;
    this.mealProductCarbs = product.carbsData;
    this.portionType = product.portionType;
    this.portionTypeInUse = product.portionType;
  }
}
