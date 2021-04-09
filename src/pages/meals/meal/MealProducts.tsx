import React, { useState } from "react";
import styled from "styled-components";
import { IonButton, IonItem, IonList } from "@ionic/react";
import { IProduct } from "../../../classes/product/IProduct";
import { useTranslation } from "react-i18next";
import { IMeal } from "../../../classes/meal/IMeal";
import { ProductsModal } from "./ProductsModal";
import { MealProductListItem } from "./MealProductListItem";
import { MealProductModal } from "./MealProductModal";

interface Props {
  meal: IMeal;
  products: IProduct[];
}

const defaultSelectedProduct: IProduct | null = null;

export const MealProducts: React.FC<Props> = ({ meal, products = [] }) => {
  const { t } = useTranslation();
  const [openProductsModal, setOpenProductsModal] = useState(false);
  const [openMealProductModal, setOpenMealProductsModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(
    defaultSelectedProduct
  );

  const handleSelect = (product: IProduct) => {
    setSelectedProduct(product);
    setOpenMealProductsModal(true);
  };

  return (
    <>
      <IonList>
        <AddButton
          size="large"
          expand="block"
          shape="round"
          onClick={() => setOpenProductsModal(true)}
        >
          {t("page.meals.button.add.product")}
        </AddButton>
        {products.map((product, i) => (
          <IonItem key={i} onClick={() => handleSelect(product)}>
            <MealProductListItem product={product} />
          </IonItem>
        ))}
      </IonList>
      <ProductsModal
        meal={meal}
        open={openProductsModal}
        onClose={() => setOpenProductsModal(false)}
      />
      <MealProductModal
        product={selectedProduct}
        open={openMealProductModal}
        onClose={() => setOpenMealProductsModal(false)}
      />
    </>
  );
};

const AddButton = styled(IonButton)`
  margin: 12px;
`;
