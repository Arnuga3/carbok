import { IProductCarbs } from "./IProductCarbs";

export class ProductCarbs implements IProductCarbs {
  portion: number;
  carbs: number;
  sugars: number;
  defaultPortion: number;

  constructor(
    portion: number,
    carbs: number,
    sugars: number,
    defaultPortion: number = 0
  ) {
    this.portion = portion;
    this.carbs = carbs;
    this.sugars = sugars;
    this.defaultPortion = defaultPortion;
  }
}
