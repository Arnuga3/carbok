import Dexie from "dexie";
import { IMeal } from "../classes/meal/IMeal";
import { IProduct } from "../classes/product/IProduct";
import { Product } from "../classes/product/Product";
import default_products from "./carbok-default-products.json";

export class CarbokDB extends Dexie {
  products: Dexie.Table<IProduct, string>;
  meals: Dexie.Table<IMeal, string>;

  constructor() {
    super("CarbokDB");
    const db = this;

    this.version(1).stores({
      products: "id, name, category.type, units.type, portionType",
      meals: "id, date, type",
    });
    db.on("populate", () => {
      db.products
        .bulkAdd(default_products as Product[])
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
  }
}

export const db = new CarbokDB();

export interface DexieExportJsonStructure {
  formatName: "dexie";
  formatVersion: 1;
  data: {
    databaseName: string;
    databaseVersion: number;
    tables: Array<{
      name: string;
      schema: string;
      rowCount: number;
    }>;
    data: Array<{
      tableName: string;
      inbound: boolean;
      rows: any[];
    }>;
  };
}
