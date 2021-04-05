import { IMeal } from "./IMeal";
import { MealType } from "./MealTypeEnum";
import { IProduct } from "../product/IProduct";
import { uuidv4 } from "../../utils/helper";

export class Meal implements IMeal {
  id: string = uuidv4();
  dateTime: Date = new Date(Date.now());
  type: MealType;
  products: IProduct[];

  constructor(type: MealType, products: IProduct[] = []) {
    this.type = type;
    this.products = products;
  }
}
