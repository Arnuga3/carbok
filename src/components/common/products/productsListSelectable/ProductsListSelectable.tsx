import React from "react";
import { IonContent } from "@ionic/react";
import { Product } from "../../../../classes/product/Product";
import { ProductsList } from "./ProductsList";

interface Props {
  products: Product[];
  productsSelected: Product[];
  onSelectionChange: (products: Product[]) => void;
}

export const ProductsListSelectable: React.FC<Props> = (props) => (
  <IonContent>{props.products && <ProductsList {...props} />}</IonContent>
);
