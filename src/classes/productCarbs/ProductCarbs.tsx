import { ICarbs } from "./ICarbs";
import { ICarbsPer100 } from "./ICarbsPer100";
import { ICarbsPerPortion } from "./ICarbsPerPortion";

export class ProductCarbs implements ICarbs {
  per100: ICarbsPer100;
  perPortion: ICarbsPerPortion;
  perPortionOn: boolean = false;

  constructor(
    per100: ICarbsPer100,
    perPortion: ICarbsPerPortion,
    perPortionOn: boolean,
  ) {
    this.per100 = per100;
    this.perPortion = perPortion;
    this.perPortionOn = perPortionOn
  }
}
