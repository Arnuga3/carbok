import Dexie from "dexie";
import default_products from "./defaultProducts.json";

class CarbokDB extends Dexie {
  products: Dexie.Table<IProductDB, number>;
  units: Dexie.Table<IUnitsDB, number>;

  constructor() {
    super("CarbokDB");
    const db = this;

    this.version(1).stores({
      products:
        "id, name, category, units, carbs100, sugars100, defPortion, quantity, qCarbs, qSugars, portionType",
      units: "id, type",
    });
    db.on("populate", () => {
      db.products
        .bulkAdd(default_products)
        .then(() => {
          console.log("Produsts populated successfully");
        })
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
    this.units = this.table("units");
  }
}

export interface IProductDB {
  id: string;
  name: string;
  category: string;
  units: string;
  carbs100: number;
  sugars100: number;
  defPortion: number;
  quantity: number;
  qCarbs: number;
  qSugars: number;
  portionType: string;
}

export interface IUnitsDB {
  id: string;
  type: string;
}

export const db = new CarbokDB();
