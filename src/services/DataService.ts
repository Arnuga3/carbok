import { db } from "../database/CarbokDB";
import { IProduct } from "../classes/product/IProduct";
import { IMeal } from "../classes/meal/IMeal";
import { getDateOnly } from "../utils/helper";

import { isPlatform } from "@ionic/react";

import {
  Plugins,
  FilesystemDirectory,
  FilesystemEncoding,
} from "@capacitor/core";
const { Filesystem } = Plugins;

class DataService {
  /* products */
  public async retrieveProducts(
    searchText: string | null
  ): Promise<IProduct[]> {
    const result = searchText && searchText.trim() !== ""
      ? await this.searchProducts(searchText)
      : await this.retrieveAllProducts();
    return result;
  }

  public async retrieveAllProducts(): Promise<IProduct[]> {
    return await db.products.orderBy("name").toArray();
  }

  private async searchProducts(searchText: string): Promise<IProduct[]> {
    const regex = new RegExp(searchText);
    return await db.products
      .orderBy("name")
      .filter((prod) => regex.test(prod.name.toLowerCase()))
      .toArray();
  }

  public async addProduct(product: IProduct): Promise<void> {
    await db.products.put(product);
  }

  public async updateProduct(product: IProduct): Promise<void> {
    await db.products.update(product.id as any, product);
  }

  public async deleteProduct(id: any): Promise<void> {
    await db.products.delete(id);
  }
  /* end products */

  /* meals */
  public async retrieveMeals(date: Date): Promise<IMeal[]> {
    return await db.meals.where("date").equals(getDateOnly(date)).toArray();
  }

  public async retrieveMealsBetween(fromDate: Date, toDate: Date) {
    return await db.meals
      .where("date")
      .between(getDateOnly(fromDate), getDateOnly(toDate))
      .toArray();
  }

  public async addMeal(meal: IMeal): Promise<void> {
    await db.meals.put(meal);
  }

  public async updateMeal(meal: IMeal): Promise<void> {
    await db.meals.update(meal.id as any, meal);
  }

  public async updateMeals(meals: IMeal[]): Promise<void> {
    await db.meals.bulkPut(meals);
  }

  public async deleteMeal(id: string): Promise<void> {
    await db.meals.delete(id);
  }
  /* end meals */

  /* import - export */
  public async exportData(): Promise<void> {
    try {
      const dbExport = await db.transaction("r", db.tables, () => {
        return Promise.all(
          db.tables.map((table) =>
            table.toArray().then((rows) => ({ table: table.name, rows: rows }))
          )
        );
      });
      const data: { fileName: string; json: string } = {
        fileName: `carbok-dexie-${Date.now()}`,
        json: JSON.stringify(dbExport),
      };
      isPlatform("hybrid") ? this.writeFile(data) : this.downloadFile(data);
    } catch (error) {
      console.error("" + error);
    }
  }

  private downloadFile(data: { fileName: string; json: string }) {
    const a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(
      new Blob([data.json], { type: "application/json" })
    );
    a.download = `${data.fileName}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  private async writeFile(data: { fileName: string; json: string }) {
    await Filesystem.writeFile({
      path: `${data.fileName}.json`,
      data: data.json,
      directory: FilesystemDirectory.Documents,
      encoding: FilesystemEncoding.UTF8,
    });
  }

  public async importData(data: string): Promise<void> {
    await db.products.clear();
    await db.meals.clear();
    await db.transaction("rw", db.tables, () => {
      return Promise.all(
        JSON.parse(data).map(async (t: any) => {
          await db.table(t.table).clear();
          if (t.table === "meals") {
            return await db.table(t.table).bulkAdd(
              t.rows.map((r: IMeal) => ({
                ...r,
                date: getDateOnly(new Date(r.date)),
              }))
            );
          } else {
            return await db.table(t.table).bulkAdd(t.rows);
          }
        })
      );
    });
  }
  /* end import - export */
}

export const dataService = new DataService();
