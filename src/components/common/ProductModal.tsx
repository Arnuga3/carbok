import React from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
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

interface Props {
  product: Product | null;
  open: boolean;
  onClose: any;
}

export const ProductModal: React.FC<Props> = ({ product, open, onClose }) => {
  const { t } = useTranslation();

  return (
    <>
      {product ? (
        <IonModal isOpen={open} onWillDismiss={onClose}>
          <Content color="primary">
            <Wrapper>
              <Label color="white">
                <h3>{product.name}</h3>
              </Label>
              <Categories color="secondary">
                {product.categories.map((category, i) => (
                  <small key={i}>{` ${t(getCatKey(category))} `}</small>
                ))}
              </Categories>
            </Wrapper>
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
                        <b>{product.carbsData.per100.carbs}</b>&nbsp;
                        {t("units.grams.short")}
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol size="8">{t("of.which.sugars")}</IonCol>
                      <IonCol>
                        <b>{product.carbsData.per100.sugars}</b>&nbsp;
                        {t("units.grams.short")}
                      </IonCol>
                    </IonRow>
                    {product.portionType === "quantity" && (
                      <IonGrid style={{ marginTop: 12 }}>
                        <IonRow>
                          <IonCol size="8">
                            <div>{t("per")}</div>
                          </IonCol>
                          <IonCol>
                            <b>{product.carbsData.perPortion.quantity}</b>&nbsp;
                            {product.carbsData.perPortion.description}
                          </IonCol>
                        </IonRow>
                        <IonRow>
                          <IonCol size="8">{t("carbohydrates")}</IonCol>
                          <IonCol>
                            <b>{product.carbsData.perPortion.carbs}</b>&nbsp;
                            {t("units.grams.short")}
                          </IonCol>
                        </IonRow>
                        <IonRow>
                          <IonCol size="8">{t("of.which.sugars")}</IonCol>
                          <IonCol>
                            <b>{product.carbsData.perPortion.sugars}</b>&nbsp;
                            {t("units.grams.short")}
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                    )}
                  </IonGrid>
                </IonCardContent>
              </Card>
              <Button
                color="medium"
                fill="clear"
                expand="block"
                shape="round"
                onClick={onClose}
              >
                {t("button.close")}
              </Button>
            </List>
          </Content>
        </IonModal>
      ) : null}
    </>
  );
};

const Content = styled(IonContent)`
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.5);
  z-index: 99;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 36px 0;
  text-align: center;
`;

const List = styled(IonList)`
  min-height: 100%;
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.5);
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
