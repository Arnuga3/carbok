import { MealProduct } from "../classes/meal/MealProduct";
import { ICarbsPer100 } from "../classes/productCarbs/ICarbsPer100";
import { ICarbsPerPortion } from "../classes/productCarbs/ICarbsPerPortion";
import { dec2, getPercentsOf } from "../utils/helpers";

class CalculationService {

  public getPercentsOfSugars(sugars: number, carbs: number): number {
    if (!carbs || !sugars) {
      return 0;
    }
    return dec2(getPercentsOf(sugars, carbs));
  }

  public getPortionCarbs(
    carbs: number,
    portion: number,
    targetPortion: number
  ): number {
    const targetCarbs = (carbs * targetPortion) / portion;
    return dec2(targetCarbs);
  }

  public getPortionSugars(
    carbs: number,
    sugars: number,
    portion: number,
    targetPortion: number
  ): number {
    if (sugars === 0 || carbs === 0) {
      return 0;
    }
    const targetSugarsPercents = this.getPercentsOfSugars(sugars, carbs);
    const targetCarbs = this.getPortionCarbs(carbs, portion, targetPortion);
    const targetSugars = (targetCarbs * targetSugarsPercents) / 100;
    return dec2(targetSugars);
  }

  public getCarbsFromQuantity(
    perPortion: ICarbsPerPortion,
    targetQuantity: number
  ): ICarbsPerPortion {
    const { carbs, sugars, quantity } = perPortion;
    return {
      ...perPortion,
      carbs: dec2((carbs / quantity) * targetQuantity),
      sugars: dec2((sugars / quantity) * targetQuantity),
      quantity: targetQuantity,
    };
  }

  public getCarbsFromWeight(
    carbs100: number,
    sugars100: number,
    portion: number
  ): ICarbsPer100 {
    const targetCarbs = this.getPortionCarbs(carbs100, 100, portion);
    const targetSugars = this.getPortionSugars(
      carbs100,
      sugars100,
      100,
      portion
    );
    return {
      carbs: targetCarbs,
      sugars: targetSugars,
      portion,
    };
  }

  public getMealTotalCarbs(products: MealProduct[]): number {
    return products.reduce((total, product: MealProduct) => {
      const productCarbs =
        product.portionTypeInUse === "weight"
          ? +product.mealProductCarbs.per100.carbs
          : +product.mealProductCarbs.perPortion.carbs;
      return dec2((total += productCarbs));
    }, 0);
  }

  public getMealTotalSugars(products: MealProduct[]): number {
    return products.reduce((total, product: MealProduct) => {
      const productSugars =
        product.portionTypeInUse === "weight"
          ? +product.mealProductCarbs.per100.sugars
          : +product.mealProductCarbs.perPortion.sugars;
      return dec2((total += productSugars));
    }, 0);
  }
}

export const calcService = new CalculationService();
