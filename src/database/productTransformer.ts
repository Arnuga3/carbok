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

export function transformToIProductsDB(products: IProduct[]): IProductDB[] {
  return products.map((prod) => transformToIProductDB(prod));
}

export function transformToIProductDB(product: IProduct): IProductDB {
  return {
    id: product.id,
    name: product.name,
    category: product.category.type,
    units: product.units.type,
    carbs100: product.carbsData.per100.carbs,
    sugars100: product.carbsData.per100.sugars,
    defPortion: product.carbsData.per100.portion,
    quantity: product.carbsData.perPortion.quantity,
    qCarbs: product.carbsData.perPortion.carbs,
    qSugars: product.carbsData.perPortion.sugars,
    portionType: product.portionType,
  };
}
