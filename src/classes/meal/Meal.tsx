import { IMeal } from "./IMeal";
import { uuidv4 } from "../../utils/helper";
import { IMealProduct } from "./IMealProduct";
import { MealTypeEnum } from "./MealTypeEnum";

export class Meal implements IMeal {
  id: string = uuidv4();
  date: Date;
  type: MealTypeEnum;
  products: IMealProduct[];
  note: string = "";
  order: number = 0;

  constructor(
    type: MealTypeEnum,
    dateTime: Date = new Date(),
    products: IMealProduct[] = [],
    order: number,
  ) {
    this.type = type;
    this.date = dateTime;
    this.products = products;
    this.order = order;
  }
}
