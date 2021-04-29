import React from "react";
import { useTranslation } from "react-i18next";
import {
  IonInput,
  IonCol,
  IonGrid,
  IonRow,
  IonLabel,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import { IProductDummy } from "../AddProduct";
import styled from "styled-components";
import { PortionTypeEnum } from "../../../../classes/productCarbs/PortionTypeEnum";
import { PortionType } from "../../../../classes/productCarbs/PortionType";

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
  onPortionTypeChange: (type: PortionType) => void;
}

export const CarbsData: React.FC<Props> = ({
  data,
  portionValid,
  carbsValid,
  sugarsValid,
  onNumericDataChange,
  onPortionTypeChange,
}) => {
  const { t } = useTranslation();

  const handleFocus = (e: any) => {
    e.currentTarget
      .getInputElement()
      .then((el: HTMLInputElement) => el.select());
  };

  const handlePortionTypeChange = (type: string | undefined) => {
    switch (type) {
      case PortionTypeEnum.WEIGTH:
        onPortionTypeChange(PortionTypeEnum.WEIGTH);
        break;
      case PortionTypeEnum.QUANTITY:
        onPortionTypeChange(PortionTypeEnum.QUANTITY);
        break;
    }
  };

  return (
    <>
      <IonSegmentStyled
        value={data.portionType}
        onIonChange={(e) => handlePortionTypeChange(e.detail.value)}
      >
        <IonSegmentButton value={PortionTypeEnum.QUANTITY}>
          <IonLabel>{t("page.products.portion.type.quantity")}</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value={PortionTypeEnum.WEIGTH}>
          <IonLabel>{t("page.products.portion.type.weight")}</IonLabel>
        </IonSegmentButton>
      </IonSegmentStyled>
      <IonGrid>
        <IonRow>
          <IonColLeft>
            <div>
              {data.portionType === PortionTypeEnum.WEIGTH
                ? t("per.portion")
                : t("pieces.per.portion")}
            </div>
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
              onFocus={handleFocus}
            ></IonInputStyled>
            <Units>{t(data.units.shortNameKey)}</Units>
          </IonColRight>
        </IonRow>
        {!portionValid && <Error>{t("page.products.portion.error")}</Error>}
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
              onFocus={handleFocus}
            ></IonInputStyled>
            <Units>{t("units.grams.short")}</Units>
          </IonColRight>
        </IonRow>
        {!carbsValid && <Error>{t("page.products.carbs.error")}</Error>}
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
              onFocus={handleFocus}
            ></IonInputStyled>
            <Units>{t("units.grams.short")}</Units>
          </IonColRight>
        </IonRow>
        {!sugarsValid && <Error>{t("page.products.sugars.error")}</Error>}
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
              onFocus={handleFocus}
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
  font-size: 1.2em;
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

const IonSegmentStyled = styled(IonSegment)`
  width: 95%;
  margin: 10px auto;
  margin-bottom: 18px;
`;
