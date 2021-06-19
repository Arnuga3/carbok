import { ProductsFilter } from "./ProductsFilterType";
import { ThemeModeType } from "./ThemeModeType";

export interface IAppSettings {
  themeMode: ThemeModeType;
  language: string;
  productsFilter: ProductsFilter;
}
