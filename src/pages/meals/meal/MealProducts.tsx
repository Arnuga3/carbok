import React, { useState } from "react";
import styled from "styled-components";
import { IonButton, IonItem, IonLabel, IonList } from "@ionic/react";
import { IProduct } from "../../../classes/product/IProduct";
import { useTranslation } from "react-i18next";
import { IMeal } from "../../../classes/meal/IMeal";
import { ProductsModal } from "./ProductsModal";

interface Props {
  meal: IMeal;
  products: IProduct[];
}

export const MealProducts: React.FC<Props> = ({ meal, products = [] }) => {
  const { t } = useTranslation();
  const [openProductsModal, setOpenProductsModal] = useState(false);

  return (
    <>
      <IonList>
        <AddButton size="large" expand="block" shape="round" onClick={() => setOpenProductsModal(true)}>
          {t("page.meals.button.add.product")}
        </AddButton>
        {products.map((product, i) => (
          <IonItem key={i}>
            <IonLabel>{product.name}</IonLabel>
          </IonItem>
        ))}
      </IonList>
      <ProductsModal
        meal={meal}
        open={openProductsModal}
        onClose={() => setOpenProductsModal(false)}
      />
    </>
  );
};

const AddButton = styled(IonButton)`
  margin: 12px;
`;
