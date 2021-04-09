import React from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import styled from "styled-components";
import { IProduct } from "../../../classes/product/IProduct";
import { ProductCategoryType } from "../../../classes/productCategory/ProductCategoryType";

import { useTranslation } from "react-i18next";
import { close } from "ionicons/icons";

interface Props {
  product: IProduct | null;
  open: boolean;
  onClose: any;
}

export type CategoryProductsMapType = Record<ProductCategoryType, IProduct[]>;

export const MealProductModal: React.FC<Props> = ({
  product,
  open,
  onClose,
}) => {
  const { t } = useTranslation();
  return (
    <IonModal isOpen={open}>
      <IonHeader slot="fixed">
        <IonToolbar>
          <IonTitle>{product?.name}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>
              <IonIcon icon={close} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonInput
            type="number"
            inputmode="numeric"
            enterkeyhint="done"
            autofocus
            onIonFocus={(e: any) => console.log(e.detail.target.focus())}
            value={product?.carbsData.portion}
            onIonInput={(e: any) => e.target.value}
          ></IonInput>
        </IonItem>
      </IonContent>
    </IonModal>
  );
};
