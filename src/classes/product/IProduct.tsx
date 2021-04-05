import { IProductCategory } from "../productCategory/IProductCategory";
import { IUnits } from "../units/IUnits";
import { IProductCarbs } from "../productCarbs/IProductCarbs";

export interface IProduct {
    id: string;
    name: string;
    category: IProductCategory;
    units: IUnits;
    carbsData: IProductCarbs;
}