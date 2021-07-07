import { ProductsFilter } from "../../classes/appSettings/ProductsFilterType";
import { Product } from "../../classes/product/Product";
import { ProductCategoryType } from "../../classes/productCategory/ProductCategoryType";
import { categoryColours } from "../../resources/config";


export function filterProducts(
  products: Product[],
  filter: ProductsFilter
): Product[] {
  switch (filter) {
    case "all":
      return products ?? [];
    case "default":
      return products.filter((product) => product.standard);
    case "my":
      return products.filter((product) => !product.standard);
    default:
      return [];
  }
}

export function toggleCategory(
  category: ProductCategoryType,
  productCategories: ProductCategoryType[]
): ProductCategoryType[] {
  return productCategories.includes(category)
    ? productCategories.filter((c) => c !== category)
    : [...productCategories, category];
}

export const getCategoriesColours = (
  categories: ProductCategoryType[]
): string[] => {
  let colours: string[] = [];
  for (let i = 0; i < categories.length; i++) {
    colours = [...colours, categoryColours[categories[i]]];
  }
  return colours;
};
