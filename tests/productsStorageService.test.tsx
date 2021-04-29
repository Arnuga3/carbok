import { IProduct } from "../src/classes/product/IProduct";
import { IProductCarbs } from "../src/classes/productCarbs/IProductCarbs";
import { ProductsStorageService } from "../src/services/productsStorageService";
import { IUnits } from "../src/classes/units/IUnits";
import { Product } from "../src/classes/product/Product";

import { categories } from "../src/resources/productCategories";
import { PortionTypeEnum } from "../src/classes/productCarbs/PortionTypeEnum";

const units: IUnits = {
  type: "g",
  nameKey: "gram",
  shortNameKey: "g",
};

const carbsData: IProductCarbs = {
  portionType: PortionTypeEnum.WEIGTH,
  portion: 100,
  carbs: 10,
  sugars: 2,
};

const testProducts: IProduct[] = [
  new Product("product001", categories[0], units, carbsData),
  new Product("product002", categories[0], units, carbsData),
];

describe("tests", () => {
  const prodStorageSvc = new ProductsStorageService("testProducts");

  beforeEach(() => {});

  afterEach(() => {});

  it("does something", () => {
    // ...test something
  });

  it("does something else", () => {
    // ...test something else
  });

  it("does another thing", () => {
    // ...test a third something
  });
});
