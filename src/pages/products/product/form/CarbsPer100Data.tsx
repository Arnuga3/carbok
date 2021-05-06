import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { IonInput, IonCol, IonGrid, IonRow } from "@ionic/react";
import styled from "styled-components";
import { ICarbsPer100 } from "../../../../classes/productCarbs/ICarbsPer100";
import { IProductDummy } from "../../../../classes/product/IProductDummy";
import { getUnitShortKey } from "../../../../resources/productUnits";

export enum Per100Enum {
  CARBS = "CARBS",
  SUGARS = "SUGARS",
  DEFAULT_PORTION = "DEFAULT_PORTION",
}

interface Props {
  product: IProductDummy;
  onPer100Change: (per100: ICarbsPer100, dataValid: boolean) => void;
}

export const CarbsPer100Data: React.FC<Props> = ({
  product,
  onPer100Change,
}) => {
  const { t } = useTranslation();
  const { per100 } = product.carbsData;

  const carbsValid = useCallback(() => {
    return per100.carbs >= 0 && per100.carbs <= 100;
  }, [per100.carbs]);

  const sugarsValid = useCallback(() => {
    return per100.sugars >= 0 && per100.sugars <= per100.carbs;
  }, [per100.carbs, per100.sugars]);

  const handleFocus = (e: any) => {
    e.currentTarget
      .getInputElement()
      .then((el: HTMLInputElement) => el.select());
  };

  const handlePer100Change = (type: Per100Enum, value: any) => {
    let per100 = product.carbsData.per100;
    const val = parseFloat(value);
    const result = !val || val < 0 ? 0 : val;
    switch (type) {
      case Per100Enum.CARBS:
        per100 = { ...per100, carbs: result };
        break;
      case Per100Enum.SUGARS:
        per100 = { ...per100, sugars: result };
        break;
      case Per100Enum.DEFAULT_PORTION:
        per100 = { ...per100, portion: result };
        break;
    }
    onPer100Change(per100, carbsValid() && sugarsValid());
  };

  return (
    <IonGrid>
      <IonRow>
        <IonColLeft>
          <div>{t("carbohydrates")}</div>
        </IonColLeft>
        <IonColRight>
          <IonInputStyled
            type="number"
            inputmode="numeric"
            enterkeyhint="done"
            value={per100.carbs}
            onIonChange={(e: any) =>
              handlePer100Change(Per100Enum.CARBS, e.target.value)
            }
            onFocus={handleFocus}
          ></IonInputStyled>
          <Units>{t("units.grams.short")}</Units>
        </IonColRight>
      </IonRow>
      {!carbsValid() && <Error>{t("page.products.carbs.error")}</Error>}
      <IonRow>
        <IonColLeft>
          <div>{t("of.which.sugars")}</div>
        </IonColLeft>
        <IonColRight>
          <IonInputStyled
            type="number"
            inputmode="numeric"
            enterkeyhint="done"
            value={per100.sugars}
            onIonChange={(e: any) =>
              handlePer100Change(Per100Enum.SUGARS, e.target.value)
            }
            onFocus={handleFocus}
          ></IonInputStyled>
          <Units>{t("units.grams.short")}</Units>
        </IonColRight>
      </IonRow>
      {!sugarsValid() && <Error>{t("page.products.sugars.error")}</Error>}
      <IonRow>
        <IonColLeft>
          <div>{t("portion.default")}</div>
        </IonColLeft>
        <IonColRight>
          <IonInputStyled
            type="number"
            inputmode="numeric"
            enterkeyhint="done"
            value={per100.portion}
            onIonChange={(e: any) =>
              handlePer100Change(Per100Enum.DEFAULT_PORTION, e.target.value)
            }
            onFocus={handleFocus}
          ></IonInputStyled>
          <Units>{t(getUnitShortKey(product.units.type))}</Units>
        </IonColRight>
      </IonRow>
    </IonGrid>
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
  color: var(--ion-color-danger);
  font-size: 0.7em;
  text-align: right;
`;
