import React from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonList,
  IonModal,
  IonRow,
  IonText,
} from "@ionic/react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Product } from "../../classes/product/Product";
import { getCatKey } from "../../resources/productCategories";
import { RoundedContent } from "../styled/RoundedContent";
import { RoundedContentHeader } from "../styled/RoundedContentHeader";

import Background1 from "../../resources/images/background1.jpg";

interface Props {
  product: Product | null;
  open: boolean;
  onClose: any;
}

export const ProductModal: React.FC<Props> = ({ product, open, onClose }) => {
  const { t } = useTranslation();

  return (
    <>
      <IonModal isOpen={open} onWillDismiss={onClose}>
        <RoundedContent color="primary">
          <ImageBackground src={Background1} />
          <RoundedContentHeader>
            <Label color="white">
              <h3>{product?.name}</h3>
            </Label>
            <Categories color="secondary">
              {product?.categories.map((category, i) => (
                <small key={i}>{` ${t(getCatKey(category))} `}</small>
              ))}
            </Categories>
          </RoundedContentHeader>
          <List>
            <Card>
              <IonCardContent>
                <IonGrid>
                  <IonRow>
                    <IonCol size="8">
                      <div>{t("per")}</div>
                    </IonCol>
                    <IonCol>
                      <b>{100}</b>&nbsp;
                      {t("units.grams.short")}
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="8">{t("carbohydrates")}</IonCol>
                    <IonCol>
                      <b>{product?.carbsData.per100.carbs}</b>&nbsp;
                      {t("units.grams.short")}
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="8">{t("of.which.sugars")}</IonCol>
                    <IonCol>
                      <b>{product?.carbsData.per100.sugars}</b>&nbsp;
                      {t("units.grams.short")}
                    </IonCol>
                  </IonRow>
                  {product?.portionType === "quantity" && (
                    <IonGrid style={{ marginTop: 12 }}>
                      <IonRow>
                        <IonCol size="8">
                          <div>{t("per")}</div>
                        </IonCol>
                        <IonCol>
                          <b>{product?.carbsData.perPortion.quantity}</b>&nbsp;
                          {product?.carbsData.perPortion.description}
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol size="8">{t("carbohydrates")}</IonCol>
                        <IonCol>
                          <b>{product?.carbsData.perPortion.carbs}</b>&nbsp;
                          {t("units.grams.short")}
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol size="8">{t("of.which.sugars")}</IonCol>
                        <IonCol>
                          <b>{product?.carbsData.perPortion.sugars}</b>&nbsp;
                          {t("units.grams.short")}
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  )}
                </IonGrid>
              </IonCardContent>
            </Card>
            <div>
              <Button
                color="medium"
                fill="clear"
                expand="block"
                shape="round"
                onClick={onClose}
              >
                {t("button.close")}
              </Button>
            </div>
          </List>
        </RoundedContent>
      </IonModal>
    </>
  );
};

const List = styled(IonList)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.5);
  height: calc(100% - 230px);
  margin-top: -40px;
`;

const Label = styled(IonText)`
  text-align: center;
  padding: 32px 16px 0 16px;
  z-index: 99;
`;

const Categories = styled(IonText)`
  text-align: center;
  padding-bottom: 8px;
  z-index: 99;
`;

const Card = styled(IonCard)`
  box-shadow: 0 0;
`;

const Button = styled(IonButton)`
  margin: 16px 12px;
  flex: 1;
`;

const ImageBackground = styled.img`
  position: absolute;
  filter: brightness(0.3) blur(1px);
  z-index: -1;
`;
