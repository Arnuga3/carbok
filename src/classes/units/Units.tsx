import { IUnits } from "./IUnits";
import { UnitsType } from "./UnitsType";

export class Units implements IUnits {
  type: UnitsType;
  nameKey: string;
  shortNameKey: string;

  constructor(type: UnitsType, nameKey: string, shortNameKey: string) {
    this.type = type;
    this.nameKey = nameKey;
    this.shortNameKey = shortNameKey;
  }
}
