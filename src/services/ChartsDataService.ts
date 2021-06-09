import { Meal } from "../classes/meal/Meal";
import { MealProduct } from "../classes/meal/MealProduct";
import { IPieCategory } from "../classes/productCategory/IPieCategory";
import { ProductCategoryType } from "../classes/productCategory/ProductCategoryType";
import { categoryColours, chartColors } from "../resources/config";
import { categories, getCatKey } from "../resources/productCategories";
import { getPercentsOf } from "../utils/helper";
import { calcService } from "./CalculationService";
import { dateService } from "./DateService";
import { MealData } from "../components/charts/MealCarbsLinearChart";
import _ from "lodash";

class ChartsDataService {
  public getMealsCarbLinearData(meals: Meal[]): MealData[] {
    const mealsFormatedDate = meals.map((m) => ({
      ...m,
      date: dateService.dateNoTime(m.date),
    }));
    const mealsByDate = _.chain(mealsFormatedDate)
      .groupBy("date")
      .map((value) => ({ meals: value }))
      .value();
    return mealsByDate.map((day) => this.getDayMealCarbs(day.meals));
  }
  private getDayMealCarbs(dayMeals: Meal[]): MealData {
    const dayMealCarbs: MealData = { carbs: 0, sugars: 0 };
    for (const dayMeal of dayMeals) {
      dayMealCarbs.carbs += calcService.getMealTotalCarbs(dayMeal.products);
      dayMealCarbs.sugars += calcService.getMealTotalSugars(dayMeal.products);
    }
    return dayMealCarbs;
  }
  public getBarCarbSugarData(products: MealProduct[]) {
    const carbs = calcService.getMealTotalCarbs(products);
    const sugars = calcService.getMealTotalSugars(products);
    const sugarPercentage = calcService.getPercentsOfSugars(sugars, carbs);
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
  public getPieCategoriesData(products: MealProduct[]): IPieCategory[] {
    let totalWeightCount: number = 0; // Used to calculate % of total weights

    let pieCategories = this.getPieCategories();
    products.forEach((product) => {
      const productWeight = this.getProductWeight(product);

      if (productWeight > 0) {
        totalWeightCount += productWeight;
        pieCategories = this.countWeightsForCategories(
          pieCategories,
          product.categories,
          productWeight
        );
      }
    });

    return pieCategories.map((category) => ({
      ...category,
      value: Math.floor((category.value * 100) / totalWeightCount),
    }));
  }

  private getPieCategories(): IPieCategory[] {
    return categories.map((category: ProductCategoryType) => ({
      value: 0,
      type: category,
      color: categoryColours[category],
      name: getCatKey(category),
    }));
  }

  private countWeightsForCategories(
    pieCategories: IPieCategory[],
    productCategories: ProductCategoryType[],
    productWeight: number
  ): IPieCategory[] {
    return pieCategories.map((c) =>
      productCategories.includes(c.type as ProductCategoryType)
        ? { ...c, value: c.value + productWeight / productCategories.length }
        : c
    );
  }

  private getProductWeight(product: MealProduct): number {
    const { portionTypeInUse, carbsData, mealProductCarbs } = product;

    if (portionTypeInUse === "weight") {
      return +mealProductCarbs.per100.portion;
    }

    if (
      +carbsData.per100.carbs !== 0 &&
      +mealProductCarbs.perPortion.carbs !== 0
    ) {
      /**
       * Figure out the weight of quantity using carbs data
       * x (per 100g carbs) - 100g
       * y (quantity carbs) - ? g
       */
      return getPercentsOf(
        +mealProductCarbs.perPortion.carbs,
        +carbsData.per100.carbs
      );
    }
    return 0;
  }
}

export const chartsDataService = new ChartsDataService();
