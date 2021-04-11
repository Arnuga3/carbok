import { IProduct } from "../classes/product/IProduct";
import { IProductCarbs } from "../classes/productCarbs/IProductCarbs";
import { categories } from "../resources/productCategories";

export class CalculationService {
  private getSugarsPercentage(carbs: number, ofWhichSugars: number): number {
    if (!carbs || !ofWhichSugars) {
      return 0;
    }
    return +((ofWhichSugars * 100) / carbs).toFixed(2);
  }

  public getCarbsPerPortion(
    carbs: number,
    perUnits: number,
    portion: number
  ): number {
    return +((carbs * portion) / perUnits).toFixed(2);
  }

  public getSugarsPerPortion(
    carbs: number,
    sugars: number,
    perUnits: number,
    defaultPortion: number
  ): number {
    if (sugars === 0 || carbs === 0) {
      return 0;
    }
    const carbSugarPercentage = this.getSugarsPercentage(carbs, sugars);
    const carbsPerDefaultPortions = this.getCarbsPerPortion(
      carbs,
      perUnits,
      defaultPortion
    );
    return +((carbsPerDefaultPortions * carbSugarPercentage) / 100).toFixed(2);
  }

  public calculateDefaultCarbsData(data: IProductCarbs) {
    const { portion, carbs, sugars, defaultPortion } = data;
    if (defaultPortion) {
      const defaultCarbs = this.getCarbsPerPortion(
        carbs,
        portion,
        defaultPortion,
      );
      const defaultSugars = this.getSugarsPerPortion(
        carbs,
        sugars,
        portion,
        defaultPortion,
      );
      return {
        portion: defaultPortion,
        carbs: defaultCarbs,
        sugars: defaultSugars,
        defaultPortion
      }
    }
    return data;
  }

  public getPieChartData(t: any, products: IProduct[]) {
    const categoriesUpdated = categories.map((c) => {
      return {
        name: t(c.nameKey),
        value: 0,
        type: c.type,
        color: c.color,
      };
    });

    let totalCount: number = 0;
    const categoriesWithCounts = products.reduce((data, product: IProduct) => {
      return data.map((category) => {
        if (category.type === product.category.type) {
          totalCount += +product.carbsData.portion;
          return {
            ...category,
            value: +(category.value) + +(product.carbsData.portion),
          };
        }
        return category;
      });
    }, categoriesUpdated);

    return categoriesWithCounts.map((category) => ({
      ...category,
      value: Math.floor(category.value * 100 / totalCount)
    }))
  }

  public getMealTotalCarbs(products: IProduct[]): number {
    return products.reduce((total, product: IProduct) => {
        const productCarbs = product.carbsData.portion;
        return (total += productCarbs);
      }, 0);
  }

  public getMealTotalSugars(products: IProduct[]): number {
    return products.reduce((total, product: IProduct) => {
        const productSugars = product.carbsData.sugars;
        return (total += productSugars);
      }, 0);
  }
}

export default CalculationService;
