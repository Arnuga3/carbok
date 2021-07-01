import React, { useMemo } from "react";
import { IonContent } from "@ionic/react";
import { Product } from "../../../../classes/product/Product";
import { ProductsList } from "./ProductsList";
import { ExternalElements } from "./productsListItem/ExternalElements";

interface Props {
  products: Product[];
  identifier: string;
}

export const ProductsListWithActions: React.FC<Props> = ({
  products,
  identifier,
}) => {
  const ItemsList = useMemo(() => {
    return (
      <>
        <ProductsList identifier={identifier} products={products} />
        <ExternalElements />
      </>
    );
  }, [products]);
  return <IonContent>{products && ItemsList}</IonContent>;
};
