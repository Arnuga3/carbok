import { PortionType } from "../productCarbs/PortionType";
import { ProductCarbs } from "../productCarbs/ProductCarbs";
import { ProductCategoryType } from "../productCategory/ProductCategoryType";
import { UnitsType } from "../units/UnitsType";

export interface IProductDummy {
  id?: string;
  name: string | null;
  categories: ProductCategoryType[];
  units: UnitsType;
  carbsData: ProductCarbs;
  portionType: PortionType;
}
