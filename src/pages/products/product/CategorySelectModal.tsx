import React from "react";
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import styled from "styled-components";
import { getGroupedProducts } from "../utils/productsHelper";
import { IProduct } from "../../../classes/product/IProduct";
import { ProductCategoryType } from "../../../classes/productCategory/ProductCategoryType";

import { useProducts } from "../../../hooks/productsHook";
import { categories } from "../../../resources/productCategories";

interface Props {
  open: boolean;
  onClose: any;
  onSelect: any;
}

export type CategoryProductsMapType = Record<ProductCategoryType, IProduct[]>;

export const CategorySelectModal: React.FC<Props> = ({
  open,
  onClose,
  onSelect,
}) => {
  const { products } = useProducts();
  const categoryProductsMap: CategoryProductsMapType = getGroupedProducts(
    categories,
    products
  );
  return (
    <IonModal isOpen={open} cssClass="my-custom-class">
      <IonContentStyled>
        <IonHeader slot="fixed">
          <IonToolbar>
            <IonTitle>Categories</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={onClose} fill="solid" shape="round">
                Close
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <Wrapper>
          {categories.map((category, i) => (
            <Category
              key={i}
              color={category.color}
              onClick={() => onSelect(category)}
            >
              {category.type}
              <Badge slot="end" color="secondary">
                {categoryProductsMap[category.type].length}
              </Badge>
            </Category>
          ))}
        </Wrapper>
      </IonContentStyled>
    </IonModal>
  );
};

const IonContentStyled = styled(IonContent)`
  --padding-top: 60px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  padding: 12px;
`;

const Category = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45%;
  padding: 24px;
  margin: 8px;
  border: 1px solid ${({ color }) => color};
  border-left: 8px solid ${({ color }) => color};
`;

const Badge = styled(IonBadge)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  top: -10px;
  right: -10px;
`;
