import { IProduct } from "../../../interfaces/IProduct";
import { IProductCategory } from "../../../interfaces/IProductCategory";
import { CategoryProductsMapType } from "../../../types/CategoryProductsMapType";

export function getGroupedProducts(
  categories: IProductCategory[],
  products: IProduct[]
): CategoryProductsMapType {
  const categoryProductsMap: CategoryProductsMapType = categories.reduce(
    (map: any, category) => {
      map[category.type] = [];
      return map;
    },
    {}
  );
  for (const product of products) {
    categoryProductsMap[product.category.type] = [
      ...categoryProductsMap[product.category.type],
      product,
    ];
  }
  return categoryProductsMap;
}
