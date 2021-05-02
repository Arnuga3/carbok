import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { IonInput, IonCol, IonGrid, IonRow } from "@ionic/react";
import styled from "styled-components";
import { ICarbsPerPortion } from "../../../../classes/productCarbs/ICarbsPerPortion";
import { IProductDummy } from "../../../../classes/product/IProductDummy";

export enum PerPortionEnum {
  DESCRIPTION = "DESCRIPTION",
  QUANTITY = "QUANTITY",
  CARBS = "CARBS",
  SUGARS = "SUGARS",
}

interface Props {
  product: IProductDummy;
  onPerPortionChange: (
    perPortion: ICarbsPerPortion,
    dataValid: boolean
  ) => void;
}

export const CarbsPerPortionData: React.FC<Props> = ({
  product,
  onPerPortionChange,
}) => {
  const { t } = useTranslation();
  const { perPortion } = product.carbsData;

  const quantityValid = useCallback(() => {
    return perPortion.quantity >= 1;
  }, [perPortion.quantity]);

  const carbsValid = useCallback(() => {
    return perPortion.carbs >= 0 && perPortion.carbs <= 100;
  }, [perPortion.carbs]);

  const sugarsValid = useCallback(() => {
    return perPortion.sugars >= 0 && perPortion.sugars <= perPortion.carbs;
  }, [perPortion.carbs, perPortion.sugars]);

  const handleFocus = (e: any) => {
    e.currentTarget
      .getInputElement()
      .then((el: HTMLInputElement) => el.select());
  };

  const handlePerPortionChange = (type: PerPortionEnum, value: string) => {
    let perPortion = product.carbsData.perPortion;
    const val = parseFloat(value);
    const result = !val || val < 0 ? 0 : val;
    switch (type) {
      case PerPortionEnum.DESCRIPTION:
        perPortion = {
          ...perPortion,
          description: value ?? undefined,
        };
        break;
      case PerPortionEnum.QUANTITY:
        perPortion = { ...perPortion, quantity: result };
        break;
      case PerPortionEnum.CARBS:
        perPortion = { ...perPortion, carbs: result };
        break;
      case PerPortionEnum.SUGARS:
        perPortion = { ...perPortion, sugars: result };
        break;
    }
    onPerPortionChange(
      perPortion,
      quantityValid() && carbsValid() && sugarsValid()
    );
  };

  return (
    <IonGrid>
      <IonRow>
        <IonColLeft>{t("quantity")}</IonColLeft>
        <IonColRight>
          <IonInputStyled
            type="number"
            inputmode="numeric"
            enterkeyhint="done"
            value={perPortion.quantity}
            onIonChange={(e: any) =>
              handlePerPortionChange(PerPortionEnum.QUANTITY, e.target.value)
            }
            onFocus={handleFocus}
          />
        </IonColRight>
      </IonRow>
      {!quantityValid() && <Error>{t("page.products.quantity.error")}</Error>}
      <IonRow>
        <IonColLeft>{t("description")}</IonColLeft>
        <IonColRight>
          <IonInputTextStyled
            placeholder={t("page.products.form.decription.placeholder")}
            value={perPortion.description}
            onIonChange={(e: any) =>
              handlePerPortionChange(PerPortionEnum.DESCRIPTION, e.target.value)
            }
          />
        </IonColRight>
      </IonRow>
      <IonRow>
        <IonColLeft>
          <div>{t("carbohydrates")}</div>
        </IonColLeft>
        <IonColRight>
          <IonInputStyled
            type="number"
            inputmode="numeric"
            enterkeyhint="done"
            value={perPortion.carbs}
            onIonChange={(e: any) =>
              handlePerPortionChange(PerPortionEnum.CARBS, e.target.value)
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
            value={perPortion.sugars}
            onIonChange={(e: any) =>
              handlePerPortionChange(PerPortionEnum.SUGARS, e.target.value)
            }
            onFocus={handleFocus}
          ></IonInputStyled>
          <Units>{t("units.grams.short")}</Units>
        </IonColRight>
      </IonRow>
      {!sugarsValid() && <Error>{t("page.products.sugars.error")}</Error>}
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

const IonInputTextStyled = styled(IonInput)`
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
