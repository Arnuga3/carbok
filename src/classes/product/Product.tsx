import { IProduct } from "./IProduct";
import { IProductCategory } from "../productCategory/IProductCategory";
import { IUnits } from "../units/IUnits";
import { IProductCarbs } from "../productCarbs/IProductCarbs";
import { uuidv4 } from "../../utils/helper";

export class Product implements IProduct {
  id: string = uuidv4();
  name: string;
  category: IProductCategory;
  units: IUnits;
  carbsData: IProductCarbs;

  constructor(
    name: string,
    category: IProductCategory,
    units: IUnits,
    carbsData: IProductCarbs
  ) {
    this.name = name;
    this.category = category;
    this.units = units;
    this.carbsData = carbsData;
  }
}
