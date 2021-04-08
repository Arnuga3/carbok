import { IProduct } from "../../../classes/product/IProduct";
import { IProductCategory } from "../../../classes/productCategory/IProductCategory";
import { CategoryProductsMapType } from "../product/CategoriesModal";

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
