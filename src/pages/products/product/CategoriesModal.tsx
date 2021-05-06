import React from "react";
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import styled from "styled-components";
import { getGroupedProducts } from "../utils/productsHelper";
import { IProduct } from "../../../classes/product/IProduct";
import { ProductCategoryType } from "../../../classes/productCategory/ProductCategoryType";

import { useProducts } from "../../../hooks/productsHook";
import { categories, getCatKey } from "../../../resources/productCategories";
import { useTranslation } from "react-i18next";
import { close } from "ionicons/icons";

interface Props {
  open: boolean;
  onClose: any;
  onSelect: any;
}

export type CategoryProductsMapType = Record<ProductCategoryType, IProduct[]>;
// TODO - Remove this component, keep it as an example
export const CategoriesModal: React.FC<Props> = ({
  open,
  onClose,
  onSelect,
}) => {
  const { t } = useTranslation();
  const { products } = useProducts();
  const categoryProductsMap: CategoryProductsMapType = getGroupedProducts(
    categories,
    products
  );
  return (
    <IonModal isOpen={open}>
      <IonHeader slot="fixed">
        <IonToolbar>
          <IonTitle>{t("page.products.categories.modal.title")}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>
              <IonIcon icon={close} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Wrapper>
          {categories.map((category, i) => (
            <Category
              key={i}
              // color={category.color}
              onClick={() => onSelect(category)}
            >
              {t(getCatKey(category.type))}
              <Badge slot="end" color="secondary">
                {categoryProductsMap[category.type].length}
              </Badge>
            </Category>
          ))}
        </Wrapper>
      </IonContent>
    </IonModal>
  );
};

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
