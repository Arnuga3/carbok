import { IMeal } from "./IMeal";
import { IProduct } from "../product/IProduct";
import { uuidv4 } from "../../utils/helper";
import { IMealType } from "../mealType/IMealType";

export class Meal implements IMeal {
  id: string = uuidv4();
  dateTime: Date;
  type: IMealType;
  products: IProduct[];
  note: string = "";

  constructor(
    type: IMealType,
    dateTime: Date = new Date(),
    products: IProduct[] = []
  ) {
    this.type = type;
    this.dateTime = dateTime;
    this.products = products;
  }
}
