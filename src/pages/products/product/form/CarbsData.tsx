import React from "react";
import { useTranslation } from "react-i18next";
import {
  IonInput,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/react";
import { IProductDummy } from "../AddProduct";
import styled from "styled-components";

export enum NumericInput {
  PORTION = "PORTION",
  CARBS = "CARBS",
  SUGARS = "SUGARS",
  DEFAULT_PORTION = "DEFAULT_PORTION",
}

interface Props {
  data: IProductDummy;
  portionValid: boolean;
  carbsValid: boolean;
  sugarsValid: boolean;
  onNumericDataChange: (type: NumericInput, value: string) => void;
}

export const CarbsData: React.FC<Props> = ({
  data,
  portionValid,
  carbsValid,
  sugarsValid,
  onNumericDataChange,
}) => {
  const { t } = useTranslation();
  // TODO - Add resource keys here
  return (
    <>
      <IonGrid>
        <IonRow>
          <IonColLeft>
            <div>{t("per.portion")}</div>
          </IonColLeft>
          <IonColRight>
            <IonInputStyled
              type="number"
              inputmode="numeric"
              enterkeyhint="done"
              value={data.portion}
              onIonChange={(e: any) =>
                onNumericDataChange(NumericInput.PORTION, e.target.value)
              }
            ></IonInputStyled>
            <Units>{t(data.units.shortNameKey)}</Units>
          </IonColRight>
        </IonRow>
        {!portionValid && <Error>Should be greater than 0</Error>}
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
                onNumericDataChange(NumericInput.CARBS, e.target.value)
              }
            ></IonInputStyled>
            <Units>{t("units.grams.short")}</Units>
          </IonColRight>
        </IonRow>
        {!carbsValid && <Error>Should be smaller or equal to Portion</Error>}
        <IonRow>
          <IonColLeft>
            <div>{t("of.which.sugars")}</div>
          </IonColLeft>
          <IonColRight>
            <IonInputStyled
              type="number"
              inputmode="numeric"
              enterkeyhint="done"
              value={data.sugars}
              onIonChange={(e: any) =>
                onNumericDataChange(NumericInput.SUGARS, e.target.value)
              }
            ></IonInputStyled>
            <Units>{t("units.grams.short")}</Units>
          </IonColRight>
        </IonRow>
        {!sugarsValid && (
          <Error>Should be smaller or equal to Carbohydrates</Error>
        )}
        <IonRow>
          <IonColLeft>
            <div>{t("portion.default")}</div>
          </IonColLeft>
          <IonColRight>
            <IonInputStyled
              type="number"
              inputmode="numeric"
              enterkeyhint="done"
              value={data.defaultPortion}
              onIonChange={(e: any) =>
                onNumericDataChange(
                  NumericInput.DEFAULT_PORTION,
                  e.target.value
                )
              }
            ></IonInputStyled>
            <Units>{t(data.units.shortNameKey)}</Units>
          </IonColRight>
        </IonRow>
      </IonGrid>
    </>
  );
};

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
  font-size: 2em;
  margin: 4px;
  border-radius: 8px;
  --background: var(--ion-color-light);
  --padding-end: 8px;
`;

const Units = styled.span`
  width: 20px;
`;

const Error = styled.div`
  color: salmon;
  font-size: 0.7em;
  text-align: right;
`;
