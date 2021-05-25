import { importDB, exportDB } from "dexie-export-import";
import { db, DexieExportJsonStructure } from "../database/CarbokDB";
import { IProduct } from "../classes/product/IProduct";
import { IMeal } from "../classes/meal/IMeal";
import { getDateOnly } from "../utils/helper";

import {
  Plugins,
  FilesystemDirectory,
  FilesystemEncoding,
} from "@capacitor/core";
const { Filesystem } = Plugins;

class DataService {
  /* products */
  public async retrieveProducts(
    limit: number,
    offset: number,
    searchText: string | null
  ): Promise<IProduct[]> {
    const result = searchText
      ? await this.searchAndGetProductsChunk(limit, offset, searchText)
      : await this.getProductsChunk(limit, offset);
    return result;
  }

  private async searchAndGetProductsChunk(
    limit: number,
    offset: number,
    searchText: string
  ): Promise<IProduct[]> {
    const regex = new RegExp(searchText);
    return await db.products
      .filter((prod) => regex.test(prod.name.toLowerCase()))
      .offset(offset)
      .limit(limit)
      .toArray();
  }

  private async getProductsChunk(
    limit: number,
    offset: number
  ): Promise<IProduct[]> {
    return await db.products
      .orderBy("name")
      .offset(offset)
      .limit(limit)
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
  public async retrieveMeals(date: Date) {
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
  public async exportData() {
    try {
      const dbCopy = await db.transaction("r", db.tables, () => {
        return Promise.all(
          db.tables.map((table) =>
            table.toArray().then((rows) => ({ table: table.name, rows: rows }))
          )
        );
      });
      await Filesystem.writeFile({
        path: `carbok-dexie-${Date.now()}.json`,
        data: JSON.stringify(dbCopy),
        directory: FilesystemDirectory.Documents,
        encoding: FilesystemEncoding.UTF8,
      });
    } catch (error) {
      console.error("" + error);
    }
  }
  /* end import - export */
}

// function import(data, db) {
//   return db.transaction('rw', db.tables, () => {
//       return Promise.all(data.map (t =>
//           db.table(t.table).clear()
//             .then(()=>db.table(t.table).bulkAdd(t.rows)));
//   });
// }

export const dataService = new DataService();
