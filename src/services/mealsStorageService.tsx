import { Plugins } from "@capacitor/core";
import { IMeal } from "../classes/meal/IMeal";
import { getDateString } from "../utils/helper";

const { Storage } = Plugins;
const mealsStorageKey = "meals";

export class MealsStorageService {
  private key: string;

  constructor(key: string = mealsStorageKey) {
    this.key = key;
  }

  public async getAllForDate(date: Date): Promise<IMeal[] | null> {
    const dateKey = getDateString(date);
    const { value } = await Storage.get({ key: this.key });
    return value ? JSON.parse(value)[dateKey] : null;
  }

  public async get(date: Date, id: string): Promise<IMeal | null> {
    const dayMeals = await this.getAllForDate(date);
    if (dayMeals) {
      const meal = dayMeals.find((meal: IMeal) => meal.id === id);
      return meal ? meal : null;
    }
    return null;
  }

  private async set(date: Date, meals: IMeal[]): Promise<void> {
    const dateKey = getDateString(date);
    const { value } = await Storage.get({ key: this.key });
    let mealsStored = [];
    if (value) {
      mealsStored = JSON.parse(value);
    }
    await Storage.set({
      key: this.key,
      value: JSON.stringify({
        ...mealsStored,
        [dateKey]: meals,
      }),
    });
  }

  public async save(meal: IMeal): Promise<void> {
    const today = new Date();
    const dayMeals = await this.getAllForDate(today);
    dayMeals
      ? await this.set(today, [...dayMeals, meal])
      : await this.set(today, [meal]);
  }

  public async update(date: Date, meal: IMeal): Promise<void> {
    const dayMeals = await this.getAllForDate(date);
    if (dayMeals) {
      const mealsUpdated = dayMeals.map((m: IMeal) =>
        m.id === meal.id ? { ...m, ...meal } : m
      );
      await this.set(date, mealsUpdated);
    } else {
      await this.set(date, [meal]);
    }
  }

  public async remove(date: Date, id: string): Promise<void> {
    const dayMeals = await this.getAllForDate(date);
    if (dayMeals) {
      const mealsUpdated = dayMeals.filter(
        (meal: IMeal) => meal.id !== id
      );
      await this.set(date, mealsUpdated);
    }
  }
}
