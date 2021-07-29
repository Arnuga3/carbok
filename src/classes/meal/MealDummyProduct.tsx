import { uuidv4 } from "../../utils/helpers";
import { PortionType } from "../productCarbs/PortionType";
import { ProductCarbs } from "../productCarbs/ProductCarbs";
import { ProductCategoryType } from "../productCategory/ProductCategoryType";
import { UnitsType } from "../units/UnitsType";
import { IMealProduct } from "./IMealProduct";

const dummyCarbsData: ProductCarbs = {
  per100: { carbs: 0, sugars: 0, portion: 0 },
  perPortion: { carbs: 0, sugars: 0, quantity: 0 },
};

export class MealDummyProduct implements IMealProduct {
  id: string = uuidv4();
  name: string;
  categories: ProductCategoryType[] = ['other'];
  units: UnitsType = 'g';

  carbsData: ProductCarbs = dummyCarbsData;
  mealProductCarbs: ProductCarbs = dummyCarbsData;

  portionType: PortionType = 'weight';
  portionTypeInUse: PortionType = 'weight';

  standard: boolean = false;
  dummy: boolean = true;

  constructor(name: string, carbs: number) {
    this.name = name;
    this.mealProductCarbs = {
      per100: { carbs, sugars: 0, portion: 0 },
      perPortion: { carbs: 0, sugars: 0, quantity: 0 },
    };
  }
}