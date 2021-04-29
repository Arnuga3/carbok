import { IProductCarbs } from "./IProductCarbs";
import { PortionType } from "./PortionType";
import { PortionTypeEnum } from "./PortionTypeEnum";

export class ProductCarbs implements IProductCarbs {
  portionType: PortionType;
  portion: number;
  carbs: number;
  sugars: number;
  defaultPortion: number;

  constructor(
    portion: number,
    carbs: number,
    sugars: number,
    defaultPortion: number = 0,
    portionType = PortionTypeEnum.WEIGTH
  ) {
    this.portion = portion;
    this.carbs = carbs;
    this.sugars = sugars;
    this.defaultPortion = defaultPortion;
    this.portionType = portionType;
  }
}
