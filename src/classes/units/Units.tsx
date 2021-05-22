import { IUnits } from "./IUnits";
import { UnitsType } from "./UnitsType";

export class Units implements IUnits {
  type: UnitsType;

  constructor(type: UnitsType) {
    this.type = type;
  }
}
