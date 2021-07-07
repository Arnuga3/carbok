import { IProduct } from "./IProduct";
import { PortionType } from "../productCarbs/PortionType";
import { uuidv4 } from "../../utils/helpers";
import { ProductCategoryType } from "../productCategory/ProductCategoryType";
import { ProductCarbs } from "../productCarbs/ProductCarbs";
import { UnitsType } from "../units/UnitsType";

export class Product implements IProduct {
  id: string = uuidv4();
  name: string;
  categories: ProductCategoryType[];
  units: UnitsType;
  carbsData: ProductCarbs;
  portionType: PortionType;
  standard?: boolean;

  constructor(
    name: string,
    categories: ProductCategoryType[],
    units: UnitsType,
    carbsData: ProductCarbs,
    portionType: PortionType,
    standard: boolean = false,
  ) {
    this.name = name;
    this.categories = categories;
    this.units = units;
    this.carbsData = carbsData;
    this.portionType = portionType;
    this.standard = standard;
  }
}
