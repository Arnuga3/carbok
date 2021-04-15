import React, { useCallback, useState } from "react";
import {
  IonButton,
  IonButtons,
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
  IonToolbar,
} from "@ionic/react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { close } from "ionicons/icons";

interface Props {
  open: boolean;
  onClose: any;
}

const defaultDataState = {
  portion: 100,
  carbs: 0,
  targetPortion: 0,
};

export const CalculatorModal: React.FC<Props> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const [data, setData] = useState(defaultDataState);
  const { portion, carbs, targetPortion } = data;

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
    setData(defaultDataState);
  };

  const result = () => {
    if (carbs > 0 && portion > 0 && targetPortion > 0) {
      return ((carbs / portion) * targetPortion).toFixed(2);
    } else return 0;
  };

  return (
    <IonModal isOpen={open}>
      <IonHeader slot="fixed">
        <IonToolbar color="primary">
          <IonTitle>{t("page.products.caluclator.modal.title")}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>
              <IonIcon icon={close} slot="icon-only" color="secondary" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
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
          color="secondary"
          expand="block"
          shape="round"
          size="large"
          onClick={handleReset}
        >
          {t("button.reset")}
        </ResetButton>
      </IonContent>
    </IonModal>
  );
};

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
