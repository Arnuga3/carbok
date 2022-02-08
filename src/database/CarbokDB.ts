import Dexie from "dexie";
import { Meal } from "../classes/meal/Meal";
import { Product } from "../classes/product/Product";
import default_products from "./carbok-default-products.json";

export class CarbokDB extends Dexie {
  products: Dexie.Table<Product, string>;
  meals: Dexie.Table<Meal, string>;
  keyStore: Dexie.Table<{ id: string; value: string }, string>;

  constructor() {
    super("CarbokDB");
    const db = this;

    this.version(2).stores({
      keyStore: "id, value",
    });

    this.version(1).stores({
      products: "id, name, categories, units, portionType",
      meals: "id, date, type",
    });
    db.on("populate", () => {
      db.products
        .bulkAdd(default_products as unknown as Product[])
        .then(() => console.log("Produsts populated successfully"))
        .catch(Dexie.BulkError, (e: any) => {
          console.error(
            `${default_products.length}/${
              default_products.length - e.failures.length
            } products added`
          );
        });
    });

    this.open();

    this.products = this.table("products");
    this.meals = this.table("meals");
    this.keyStore = this.table("keyStore");
  }
}

export const db = new CarbokDB();
