import { IMealProduct } from "../classes/meal/IMealProduct";
import { ICarbsPer100 } from "../classes/productCarbs/ICarbsPer100";
import { ICarbsPerPortion } from "../classes/productCarbs/ICarbsPerPortion";
import { IChartProductCategory } from "../classes/productCategory/IChartProductCategory";
import { IProductCategory } from "../classes/productCategory/IProductCategory";
import { categoryColours, chartColors } from "../resources/config";
import { categories } from "../resources/productCategories";

export class CalculationService {
  private dec2(number: number) {
    return +number.toFixed(2);
  }

  private getPercentsOf(item: number, total: number): number {
    return (item * 100) / total;
  }

  public getPercentsOfSugars(sugars: number, carbs: number): number {
    if (!carbs || !sugars) {
      return 0;
    }
    return this.dec2(this.getPercentsOf(sugars, carbs));
  }

  public getPortionCarbs(
    carbs: number,
    portion: number,
    targetPortion: number
  ): number {
    const targetCarbs = (carbs * targetPortion) / portion;
    return this.dec2(targetCarbs);
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
    return this.dec2(targetSugars);
  }

  public getCarbsFromQuantity(
    perPortion: ICarbsPerPortion,
    targetQuantity: number
  ): ICarbsPerPortion {
    const { carbs, sugars, quantity } = perPortion;
    return {
      ...perPortion,
      carbs: this.dec2((carbs / quantity) * targetQuantity),
      sugars: this.dec2((sugars / quantity) * targetQuantity),
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

  public getPieChartData(products: IMealProduct[]) {
    const chartProductCategories: IChartProductCategory[] = categories.map(
      (category: IProductCategory) => ({
        value: 0,
        type: category.type,
        color: categoryColours[category.type],
        name: category.nameKey,
      })
    );
    return this.getCategoriesWithWeights(chartProductCategories, products);
  }

  private getCategoriesWithWeights(
    categories: IChartProductCategory[],
    products: IMealProduct[]
  ): IChartProductCategory[] {
    let totalWeightCount: number = 0; // Used to calculate % of total weights
    return products
      .reduce((data, product: IMealProduct) => {
        // Count total weights for each category
        return data.map((category: IChartProductCategory) => {
          if (category.type === product.category.type) {
            const weight =
              product.portionTypeInUse === "weight"
                ? +product.mealProductCarbs.per100.portion
                : +product.carbsData.per100.carbs !== 0
                ? this.getPercentsOf(
                    +product.mealProductCarbs.perPortion.carbs,
                    +product.carbsData.per100.carbs
                  )
                : 0;

            totalWeightCount += weight;
            return { ...category, value: category.value + weight };
          }
          return category;
        });
      }, categories)
      .map((category) => ({
        // Calculate % of total weights
        ...category,
        value: Math.floor((category.value * 100) / totalWeightCount),
      }));
  }

  public getMealTotalCarbs(products: IMealProduct[]): number {
    return products.reduce((total, product: IMealProduct) => {
      const productCarbs =
        product.portionTypeInUse === "weight"
          ? +product.mealProductCarbs.per100.carbs
          : +product.mealProductCarbs.perPortion.carbs;
      return this.dec2((total += productCarbs));
    }, 0);
  }

  public getMealTotalSugars(products: IMealProduct[]): number {
    return products.reduce((total, product: IMealProduct) => {
      const productSugars =
        product.portionTypeInUse === "weight"
          ? +product.mealProductCarbs.per100.sugars
          : +product.mealProductCarbs.perPortion.sugars;
      return this.dec2((total += productSugars));
    }, 0);
  }

  public getPieChartCarbSugarPercents(products: IMealProduct[]) {
    const carbs = this.getMealTotalCarbs(products);
    const sugars = this.getMealTotalSugars(products);
    const sugarPercentage = this.getPercentsOfSugars(sugars, carbs);
    return [
      {
        value: sugarPercentage ? 100 - sugarPercentage : 0,
        color: chartColors.carbohydrates,
      },
      {
        value: sugarPercentage,
        color: chartColors.sugars,
      },
    ];
  }
}

export default CalculationService;
