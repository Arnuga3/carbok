import { IMeal } from "./IMeal";
import { IProduct } from "../product/IProduct";
import { uuidv4 } from "../../utils/helper";
import { IMealType } from "../mealType/IMealType";

export class Meal implements IMeal {
  id: string = uuidv4();
  dateTime: Date = new Date();
  type: IMealType;
  products: IProduct[];

  constructor(type: IMealType, products: IProduct[] = []) {
    this.type = type;
    this.products = products;
  }
}
