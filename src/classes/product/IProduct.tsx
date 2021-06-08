import { PortionType } from "../productCarbs/PortionType";
import { ProductCategoryType } from "../productCategory/ProductCategoryType";
import { ProductCarbs } from "../productCarbs/ProductCarbs";
import { UnitsType } from "../units/UnitsType";

export interface IProduct {
    id: string;
    name: string;
    categories: ProductCategoryType[];
    units: UnitsType;
    carbsData: ProductCarbs;
    portionType: PortionType;
    standard?: boolean;
}