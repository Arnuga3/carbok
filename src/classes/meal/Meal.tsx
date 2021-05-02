import { IMeal } from "./IMeal";
import { uuidv4 } from "../../utils/helper";
import { IMealType } from "../mealType/IMealType";
import { IMealProduct } from "./IMealProduct";

export class Meal implements IMeal {
  id: string = uuidv4();
  dateTime: Date;
  type: IMealType;
  products: IMealProduct[];
  note: string = "";

  constructor(
    type: IMealType,
    dateTime: Date = new Date(),
    products: IMealProduct[] = []
  ) {
    this.type = type;
    this.dateTime = dateTime;
    this.products = products;
  }
}
