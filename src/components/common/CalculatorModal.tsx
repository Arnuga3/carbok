import React, { useCallback, useEffect, useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonInput,
  IonList,
  IonModal,
  IonRow,
  IonText,
} from "@ionic/react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { IProduct } from "../../classes/product/IProduct";
import { focusElement } from "../../utils/eventHelpers";
import { RoundedContent } from "../styled/RoundedContent";
import { RoundedContentHeader } from "../styled/RoundedContentHeader";

import Background1 from "../../resources/images/background1.jpg";

interface Props {
  product?: IProduct | null;
  open: boolean;
  onClose: () => void;
}

const defaultDataState = {
  portion: 100,
  carbs: 0,
  targetPortion: 0,
};

export const CalculatorModal: React.FC<Props> = ({
  product = null,
  open,
  onClose,
}) => {
  const { t } = useTranslation();
  const [data, setData] = useState(defaultDataState);
  const { portion, carbs, targetPortion } = data;

  useEffect(() => {
    if (product) {
      setData({
        portion: 100,
        carbs: product.carbsData.per100.carbs,
        targetPortion: product.carbsData.per100.portion ?? 0,
      });
    } else {
      setData(defaultDataState);
    }
  }, [product]);

  const portionValid = useCallback(() => {
    return data.portion > 0;
  }, [data.portion]);

  const carbsValid = useCallback(() => {
    return data.carbs >= 0 && data.carbs <= data.portion;
  }, [data.carbs, data.portion]);

  const handleReset = () => {
    if (product) {
      setData({
        portion: 100,
        carbs: product.carbsData.per100.carbs,
        targetPortion: product.carbsData.per100.portion ?? 0,
      });
    } else {
      setData(defaultDataState);
    }
  };

  const result = () => {
    if (carbs > 0 && portion > 0 && targetPortion > 0) {
      return ((carbs / portion) * targetPortion).toFixed(2);
    } else return 0;
  };

  return (
    <IonModal isOpen={open} onWillDismiss={onClose}>
      <RoundedContent color="primary">
        <ImageBackground src={Background1} />
        <RoundedContentHeader>
          <Result color="white">
            <h1>{result()}</h1>
          </Result>
          <Label color="white">
            <small>{t("page.products.caluclator.modal.result.title")}</small>
          </Label>
          {product && <Label color="secondary">{product.name}</Label>}
        </RoundedContentHeader>
        <List>
          <Card>
            <IonCardContent>
              <IonGrid>
                <IonRow>
                  <IonColLeft>
                    <div>{t("per")}</div>
                  </IonColLeft>
                  <IonColRight>
                    <IonInputStyled
                      type="number"
                      inputmode="numeric"
                      enterkeyhint="done"
                      value={data.portion}
                      onIonChange={(e: any) =>
                        setData({ ...data, portion: e.target.value })
                      }
                      onFocus={focusElement}
                    ></IonInputStyled>
                    <Units>{`${t("units.milliliters.short")}/ ${t(
                      "units.grams.short"
                    )}`}</Units>
                  </IonColRight>
                </IonRow>
                {!portionValid() && (
                  <Error>{t("page.products.portion.error")}</Error>
                )}
                <IonRow>
                  <IonColLeft>
                    <div>{t("carbohydrates")}</div>
                  </IonColLeft>
                  <IonColRight>
                    <IonInputStyled
                      type="number"
                      inputmode="numeric"
                      enterkeyhint="done"
                      value={data.carbs}
                      onIonChange={(e: any) =>
                        setData({ ...data, carbs: e.target.value })
                      }
                      onFocus={focusElement}
                    ></IonInputStyled>
                    <Units>{t("units.grams.short")}</Units>
                  </IonColRight>
                </IonRow>
                {!carbsValid() && (
                  <Error>{t("page.products.carbs.error")}</Error>
                )}
                <IonRow>
                  <IonColLeft>
                    <div>{t("portion.size")}</div>
                  </IonColLeft>
                  <IonColRight>
                    <IonInputStyled
                      type="number"
                      inputmode="numeric"
                      enterkeyhint="done"
                      value={data.targetPortion}
                      onIonChange={(e: any) =>
                        setData({ ...data, targetPortion: e.target.value })
                      }
                      onFocus={focusElement}
                    ></IonInputStyled>
                    <Units>{t("units.grams.short")}</Units>
                  </IonColRight>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </Card>
          <Buttons>
            <Button
              color="medium"
              fill="clear"
              expand="block"
              shape="round"
              onClick={onClose}
            >
              {t("button.close")}
            </Button>
            <Button
              color="secondary"
              expand="block"
              shape="round"
              onClick={handleReset}
            >
              {t("button.reset")}
            </Button>
          </Buttons>
        </List>
      </RoundedContent>
    </IonModal>
  );
};

const List = styled(IonList)`
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.5);
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  min-height: 100%;
`;

const Label = styled(IonText)`
  text-align: center;
  padding-bottom: 8px;
`;

const Result = styled(IonText)`
  z-index: 100;
  h1 {
    font-size: 4em;
    font-weight: bold;
  }
`;

const Card = styled(IonCard)`
  box-shadow: 0 0;
`;

const IonColLeft = styled(IonCol)`
  display: flex;
  align-items: center;
  font-size: 0.9em;
`;

const IonColRight = styled(IonCol)`
  display: flex;
  align-items: center;
  padding: 0;
  font-weight: bold;
  font-size: 0.9em;
`;

const IonInputStyled = styled(IonInput)`
  text-align: right;
  font-size: 1.2em;
  margin: 4px;
  border-radius: 8px;
  --background: var(--ion-color-light);
  --padding-end: 8px;
`;

const Units = styled.span`
  width: 40px;
  text-align: right;
`;

const Error = styled.div`
  color: salmon;
  font-size: 0.7em;
  text-align: right;
`;

const Buttons = styled.div`
  display: flex;
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
