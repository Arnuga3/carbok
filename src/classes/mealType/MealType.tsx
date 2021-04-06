import { IMealType } from "./IMealType";
import { MealTypeEnum } from "./MealTypeEnum";

export class MealType implements IMealType {
  type: MealTypeEnum;
  nameKey: string;

  constructor(type: MealTypeEnum, nameKey: string) {
    this.type = type;
    this.nameKey = nameKey;
  }
}
