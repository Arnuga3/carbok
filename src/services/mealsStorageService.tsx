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

  public async getAllForDate(date: Date): Promise<IMeal[]> {
    const dateKey = getDateString(date);
    const { value } = await Storage.get({ key: this.key });
    return value && JSON.parse(value)[dateKey] ? JSON.parse(value)[dateKey] : [];
  }

  public async get(date: Date, id: string): Promise<IMeal | null> {
    const dayMeals = await this.getAllForDate(date);
    const meal = dayMeals.find((meal: IMeal) => meal.id === id);
    return meal ? meal : null;
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
    const date = meal.dateTime;
    const dayMeals = await this.getAllForDate(date);
    await this.set(date, [...dayMeals, meal]);
  }

  public async update(date: Date, meal: IMeal): Promise<void> {
    const dayMeals = await this.getAllForDate(date);
    const mealsUpdated = dayMeals.map((m: IMeal) =>
      m.id === meal.id ? { ...m, ...meal } : m
    );
    await this.set(date, mealsUpdated);
  }

  public async remove(meal: IMeal): Promise<void> {
    const dayMeals = await this.getAllForDate(meal.dateTime);
    const mealsUpdated = dayMeals.filter((m: IMeal) => m.id !== meal.id);
    await this.set(meal.dateTime, mealsUpdated);
  }
}
