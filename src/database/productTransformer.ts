import { IProduct } from "../classes/product/IProduct";
import { Product } from "../classes/product/Product";
import { ICarbsPer100 } from "../classes/productCarbs/ICarbsPer100";
import { ICarbsPerPortion } from "../classes/productCarbs/ICarbsPerPortion";
import { PortionType } from "../classes/productCarbs/PortionType";
import { ProductCarbs } from "../classes/productCarbs/ProductCarbs";
import { ProductCategory } from "../classes/productCategory/ProductCategory";
import { ProductCategoryType } from "../classes/productCategory/ProductCategoryType";
import { Units } from "../classes/units/Units";
import { UnitsType } from "../classes/units/UnitsType";
import { IProductDB } from "./CarbokDB";

export function transformToIProducts(dbProducts: IProductDB[]): IProduct[] {
  return dbProducts.map((dbProd) => transformToIProduct(dbProd));
}

export function transformToIProduct(dbProduct: IProductDB): IProduct {
  const {
    id,
    name,
    category,
    units,
    carbs100,
    sugars100,
    defPortion,
    quantity,
    qCarbs,
    qSugars,
    portionType,
  } = dbProduct;

  const per100Carbs: ICarbsPer100 = {
    carbs: carbs100,
    sugars: sugars100,
    portion: defPortion,
  };

  const perPortionCarbs: ICarbsPerPortion = {
    quantity: quantity,
    carbs: qCarbs,
    sugars: qSugars,
  };

  const product = new Product(
    name,
    new ProductCategory(category as ProductCategoryType),
    new Units(units as UnitsType),
    new ProductCarbs(per100Carbs, perPortionCarbs),
    portionType as PortionType
  );
  return { ...product, id };
}
