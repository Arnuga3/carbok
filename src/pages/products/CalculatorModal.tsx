import React, { useCallback, useEffect, useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonModal,
  IonRow,
  IonText,
  IonTitle,
} from "@ionic/react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { close } from "ionicons/icons";
import { IProduct } from "../../classes/product/IProduct";

interface Props {
  product: IProduct | null;
  open: boolean;
  onClose: any;
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

  const handleFocus = (e: any) => {
    e.currentTarget
      .getInputElement()
      .then((el: HTMLInputElement) => el.select());
  };

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
      <IonHeader mode="ios" translucent>
        <HeaderContent>
          <IonTitle color="medium">{t("page.products.caluclator.modal.title")}</IonTitle>
          <IonButton onClick={onClose} color="primary" fill="clear">
            <IonIcon icon={close} slot="icon-only" />
          </IonButton>
        </HeaderContent>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              {t("page.products.caluclator.modal.result.title")}:
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonText>
              <Result>{result()}</Result>
            </IonText>
          </IonCardContent>
        </IonCard>
        <IonCard>
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
                    onFocus={handleFocus}
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
                    onFocus={handleFocus}
                  ></IonInputStyled>
                  <Units>{t("units.grams.short")}</Units>
                </IonColRight>
              </IonRow>
              {!carbsValid() && <Error>{t("page.products.carbs.error")}</Error>}
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
                    onFocus={handleFocus}
                  ></IonInputStyled>
                  <Units>{t("units.grams.short")}</Units>
                </IonColRight>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
        <ResetButton
          color="primary"
          expand="block"
          shape="round"
          onClick={handleReset}
        >
          {t("button.reset")}
        </ResetButton>
      </IonContent>
    </IonModal>
  );
};

const HeaderContent = styled.div`
  display: flex;
  padding: 0 8px;
`;

const Result = styled.div`
  text-align: center;
  font-size: 3.5em;
  font-weight: bold;
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

const ResetButton = styled(IonButton)`
  margin: 12px;
`;
