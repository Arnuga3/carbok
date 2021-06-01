import { IMeal } from "./IMeal";
import { uuidv4 } from "../../utils/helper";
import { MealTypeEnum } from "./MealTypeEnum";
import { MealProduct } from "./MealProduct";

export class Meal implements IMeal {
  id: string = uuidv4();
  date: Date;
  type: MealTypeEnum;
  products: MealProduct[];
  note: string = "";
  order: number = 0;

  constructor(
    type: MealTypeEnum,
    dateTime: Date = new Date(),
    products: MealProduct[] = []
  ) {
    this.type = type;
    this.date = dateTime;
    this.products = products;
  }
}
