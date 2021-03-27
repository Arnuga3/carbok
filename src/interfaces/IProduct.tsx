import { IProductCategory } from "./IProductCategory";
import { IUnits } from "./IUnits";
import { ICarbsData } from "./ICarbsData";

export interface IProduct {
    id: string;
    name: string;
    category: IProductCategory;
    units: IUnits;
    carbsData: ICarbsData;
}