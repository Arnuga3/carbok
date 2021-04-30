import { IProductCategory } from "../productCategory/IProductCategory";
import { IUnits } from "../units/IUnits";
import { ICarbs } from "../productCarbs/ICarbs";

export interface IProduct {
    id: string;
    name: string;
    category: IProductCategory;
    units: IUnits;
    carbsData: ICarbs;
}