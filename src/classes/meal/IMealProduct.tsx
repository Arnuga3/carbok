import { IProduct } from "../product/IProduct";
import { PortionType } from "../productCarbs/PortionType";
import { ProductCarbs } from "../productCarbs/ProductCarbs";

export interface IMealProduct extends IProduct {
    readonly carbsData: ProductCarbs;
    readonly portionType: PortionType;
    mealProductCarbs: ProductCarbs;
    portionTypeInUse: PortionType;
}