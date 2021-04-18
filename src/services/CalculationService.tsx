import { IProduct } from "../classes/product/IProduct";
import { IProductCarbs } from "../classes/productCarbs/IProductCarbs";
import { IChartProductCategory } from "../classes/productCategory/IChartProductCategory";
import { IProductCategory } from "../classes/productCategory/IProductCategory";
import { chartColors } from "../resources/config";
import { categories } from "../resources/productCategories";

export class CalculationService {
  private dec2(number: number) {
    return +number.toFixed(2);
  }

  private getPercentsOf(item: number, total: number): number {
    return (item * 100) / total;
  }

  private getPercentsOfSugars(sugars: number, carbs: number): number {
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

  public calculateTargetCarbsData(data: IProductCarbs) {
    const { portion, carbs, sugars, defaultPortion } = data;
    if (defaultPortion) {
      const targetCarbs = this.getPortionCarbs(carbs, portion, defaultPortion);
      const targetSugars = this.getPortionSugars(
        carbs,
        sugars,
        portion,
        defaultPortion
      );
      return {
        portion: defaultPortion,
        carbs: targetCarbs,
        sugars: targetSugars,
        defaultPortion,
      };
    }
    return data;
  }

  public getPieChartData(products: IProduct[]) {
    const chartProductCategories: IChartProductCategory[] = categories.map(
      (category: IProductCategory) => ({
        value: 0,
        type: category.type,
        color: category.color,
        name: category.nameKey,
      })
    );
    return this.getCategoriesWithWeights(chartProductCategories, products);
  }

  private getCategoriesWithWeights(
    categories: IChartProductCategory[],
    products: IProduct[]
  ): IChartProductCategory[] {
    let totalWeightCount: number = 0; // Used to calculate % of total weights
    return products
      .reduce((data, product: IProduct) => {
        // Count total weights for each category
        return data.map((category: IChartProductCategory) => {
          if (category.type === product.category.type) {
            totalWeightCount += +product.carbsData.portion;
            return {
              ...category,
              value: category.value + +product.carbsData.portion,
            };
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

  public getMealTotalCarbs(products: IProduct[]): number {
    return products.reduce((total, product: IProduct) => {
      const productCarbs = +product.carbsData.carbs;
      return this.dec2(total += productCarbs);
    }, 0);
  }

  public getMealTotalSugars(products: IProduct[]): number {
    return products.reduce((total, product: IProduct) => {
      const productSugars = +product.carbsData.sugars;
      return this.dec2(total += productSugars);
    }, 0);
  }

  public getPieChartCarbSugarPercents(products: IProduct[]) {
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
