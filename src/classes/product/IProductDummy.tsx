import { ICarbs } from "../productCarbs/ICarbs";
import { IProductCategory } from "../productCategory/IProductCategory";
import { IUnits } from "../units/IUnits";

export interface IProductDummy {
  id?: string;
  name: string | null;
  category: IProductCategory | null;
  units: IUnits;
  carbsData: ICarbs;
}
