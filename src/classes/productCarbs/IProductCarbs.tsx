import { PortionType } from "./PortionType";

export interface IProductCarbs {
    portionType: PortionType;
    portion: number;
    carbs: number;
    sugars: number;
    defaultPortion?: number;
}