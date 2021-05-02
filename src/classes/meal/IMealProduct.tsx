import { ICarbs } from "../productCarbs/ICarbs";
import { IProduct } from "../product/IProduct";
import { PortionType } from "../productCarbs/PortionType";

export interface IMealProduct extends IProduct {
    readonly carbsData: ICarbs;
    readonly portionType: PortionType;
    mealProductCarbs: ICarbs;
    portionTypeInUse: PortionType;
}