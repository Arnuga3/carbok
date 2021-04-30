import { ICarbs } from "./ICarbs";
import { ICarbsPer100 } from "./ICarbsPer100";
import { ICarbsPerPortion } from "./ICarbsPerPortion";

export class ProductCarbs implements ICarbs {
  per100: ICarbsPer100;
  perPortion: ICarbsPerPortion;

  constructor(
    per100: ICarbsPer100,
    perPortion: ICarbsPerPortion,
  ) {
    this.per100 = per100;
    this.perPortion = perPortion;
  }
}
