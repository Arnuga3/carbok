import React from "react";
import { Product } from "../../../../classes/product/Product";
import { ProductsList } from "./ProductsList";

interface Props {
  products: Product[];
  productsSelected: Product[];
  onSelectionChange: (products: Product[]) => void;
}

export const ProductsListSelectable: React.FC<Props> = (props) =>
  props.products && <ProductsList {...props} />;
