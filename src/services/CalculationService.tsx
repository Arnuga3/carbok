import { MealProduct } from "../classes/meal/MealProduct";
import { ICarbsPer100 } from "../classes/productCarbs/ICarbsPer100";
import { ICarbsPerPortion } from "../classes/productCarbs/ICarbsPerPortion";
import { IChartProductCategory } from "../classes/productCategory/IChartProductCategory";
import { ProductCategoryType } from "../classes/productCategory/ProductCategoryType";
import { categoryColours, chartColors } from "../resources/config";
import { categories, getCatKey } from "../resources/productCategories";

export function getPercentsOf(item: number, total: number): number {
  return (item * 100) / total;
}

export class CalculationService {
  private dec2(number: number) {
    return +number.toFixed(2);
  }

  public getPercentsOfSugars(sugars: number, carbs: number): number {
    if (!carbs || !sugars) {
      return 0;
    }
    return this.dec2(getPercentsOf(sugars, carbs));
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

  public getPieChartData(products: MealProduct[]) {
    const chartProductCategories: IChartProductCategory[] = categories.map(
      (category: ProductCategoryType) => ({
        value: 0,
        type: category,
        color: categoryColours[category],
        name: getCatKey(category),
      })
    );
    const cats = this.getCategoriesWithWeights(
      chartProductCategories,
      products
    );
    return cats;
  }

  private getCategoriesWithWeights(
    categories: IChartProductCategory[],
    products: MealProduct[]
  ): IChartProductCategory[] {
    let totalWeightCount: number = 0; // Used to calculate % of total weights

    let categoriesWithWeight = categories;
    products.forEach((p) => {
      categoriesWithWeight = this.countCategoriesWeights(
        categoriesWithWeight,
        p
      );
    });

    return categoriesWithWeight.map((category) => ({
      ...category,
      value: Math.floor((category.value * 100) / totalWeightCount),
    }));
  }

  private countCategoriesWeights(
    chartCategories: IChartProductCategory[],
    product: MealProduct
  ): IChartProductCategory[] {
    const productCategories = product.categories;
    const productWeight = this.getWeight(product);

    if (productWeight) {
      const categoryWeight = productWeight / productCategories.length;
      const cats = chartCategories.map((c) =>
        productCategories.includes(c.type as ProductCategoryType)
          ? { ...c, value: c.value + categoryWeight }
          : c
      );
      console.log(cats);
      return cats;
    }
    return chartCategories;
  }

  private getWeight(product: MealProduct): number {
    if (product.portionTypeInUse === "weight") {
      return product.mealProductCarbs.per100.portion;
    }
    // TODO - Why carbs here?
    if (+product.carbsData.per100.carbs !== 0) {
      return getPercentsOf(
        +product.mealProductCarbs.perPortion.carbs,
        +product.carbsData.per100.carbs
      );
    }
    return 0;
  }

  public getMealTotalCarbs(products: MealProduct[]): number {
    return products.reduce((total, product: MealProduct) => {
      const productCarbs =
        product.portionTypeInUse === "weight"
          ? +product.mealProductCarbs.per100.carbs
          : +product.mealProductCarbs.perPortion.carbs;
      return this.dec2((total += productCarbs));
    }, 0);
  }

  public getMealTotalSugars(products: MealProduct[]): number {
    return products.reduce((total, product: MealProduct) => {
      const productSugars =
        product.portionTypeInUse === "weight"
          ? +product.mealProductCarbs.per100.sugars
          : +product.mealProductCarbs.perPortion.sugars;
      return this.dec2((total += productSugars));
    }, 0);
  }

  public getPieChartCarbSugarPercents(products: MealProduct[]) {
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
