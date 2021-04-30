import { IProduct } from "./IProduct";
import { IProductCategory } from "../productCategory/IProductCategory";
import { IUnits } from "../units/IUnits";
import { uuidv4 } from "../../utils/helper";
import { ICarbs } from "../productCarbs/ICarbs";

export class Product implements IProduct {
  id: string = uuidv4();
  name: string;
  category: IProductCategory;
  units: IUnits;
  carbsData: ICarbs;

  constructor(
    name: string,
    category: IProductCategory,
    units: IUnits,
    carbsData: ICarbs
  ) {
    this.name = name;
    this.category = category;
    this.units = units;
    this.carbsData = carbsData;
  }
}
