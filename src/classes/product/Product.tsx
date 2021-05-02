import { IProduct } from "./IProduct";
import { IProductCategory } from "../productCategory/IProductCategory";
import { IUnits } from "../units/IUnits";
import { ICarbs } from "../productCarbs/ICarbs";
import { PortionType } from "../productCarbs/PortionType";
import { uuidv4 } from "../../utils/helper";

export class Product implements IProduct {
  id: string = uuidv4();
  name: string;
  category: IProductCategory;
  units: IUnits;
  carbsData: ICarbs;
  portionType: PortionType;

  constructor(
    name: string,
    category: IProductCategory,
    units: IUnits,
    carbsData: ICarbs,
    portionType: PortionType,
  ) {
    this.name = name;
    this.category = category;
    this.units = units;
    this.carbsData = carbsData;
    this.portionType = portionType;
  }
}
