import { db } from "../database/CarbokDB";
import { isPlatform } from "@ionic/react";
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Meal } from "../classes/meal/Meal";
import { Product } from "../classes/product/Product";
import { dateService } from "./DateService";
import default_products from "./../database/carbok-default-products.json";

class DataService {
  /* products */
  public async retrieveProducts(searchText: string | null): Promise<Product[]> {
    const result =
      searchText && searchText.trim() !== ""
        ? await this.searchProducts(searchText)
        : await this.retrieveAllProducts();
    return result;
  }

  public async retrieveAllProducts(): Promise<Product[]> {
    return await db.products.orderBy("name").toArray();
  }

  private async searchProducts(searchText: string): Promise<Product[]> {
    const regex = new RegExp(searchText.toLowerCase());
    return await db.products
      .orderBy("name")
      .filter((prod) => regex.test(prod.name.toLowerCase()))
      .toArray();
  }

  public async addProduct(product: Product): Promise<void> {
    await db.products.put(product);
  }

  public async updateProduct(product: Product): Promise<void> {
    await db.products.update(product.id as any, product);
  }

  public async deleteProduct(id: any): Promise<void> {
    await db.products.delete(id);
  }
  /* end products */

  /* meals */
  public async retrieveMeals(date: Date): Promise<Meal[]> {
    return await db.meals.where("date").equals(date).toArray();
  }

  public async retrieveMealsBetween(fromDate: Date, toDate: Date) {
    return await db.meals.where("date").between(fromDate, toDate).toArray();
  }

  public async addMeal(meal: Meal): Promise<void> {
    await db.meals.put(meal);
  }

  public async updateMeal(meal: Meal): Promise<void> {
    await db.meals.update(meal.id as any, meal);
  }

  public async updateMeals(meals: Meal[]): Promise<void> {
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
          db.tables.map((table) => {
            if (table.name === "products") {
              return table.toArray().then((rows) => ({
                table: table.name,
                rows: rows.filter((product: Product) => !product.standard),
              }));
            } else {
              return table
                .toArray()
                .then((rows) => ({ table: table.name, rows }));
            }
          })
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
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
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
              t.rows.map((r: Meal) => ({
                ...r,
                date: dateService.dateNoTime(new Date(r.date)),
              }))
            );
          } else if (t.table === "products") {
            return await db
              .table(t.table)
              .bulkAdd([
                ...(default_products as unknown as Product[]),
                ...t.rows,
              ]);
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
