import { ICarbsPer100 } from "./ICarbsPer100";
import { ICarbsPerPortion } from "./ICarbsPerPortion";

export interface ICarbs {
    per100: ICarbsPer100;
    perPortion: ICarbsPerPortion;
    perPortionOn: boolean;
}