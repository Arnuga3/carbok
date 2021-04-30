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
  // TODO - quantity validation
  onPerPortionChange: (perPortion: ICarbsPerPortion) => void;
}

export const CarbsPerPortionData: React.FC<Props> = ({
  product,
  onPerPortionChange,
}) => {
  const { t } = useTranslation();
  const { perPortion } = product.carbsData;

  // const sugarsValid = useCallback(() => {
  //   return perPortion.sugars >= 0 && perPortion.sugars <= perPortion.carbs;
  // }, [perPortion.carbs, perPortion.sugars]);

  const handleFocus = (e: any) => {
    e.currentTarget
      .getInputElement()
      .then((el: HTMLInputElement) => el.select());
  };

  const handlePerPortionChange = (type: PerPortionEnum, value: string) => {
    let perPortion = product.carbsData.perPortion;
    switch (type) {
      case PerPortionEnum.DESCRIPTION:
        perPortion = ({ ...perPortion, description: value ? value.trim() : undefined });
        break;
      case PerPortionEnum.QUANTITY:
        perPortion = ({ ...perPortion, quantity: value ? parseFloat(value) : 1 });
        break;
      case PerPortionEnum.CARBS:
        perPortion = ({ ...perPortion, carbs: parseFloat(value) });
        break;
      case PerPortionEnum.SUGARS:
        perPortion = ({ ...perPortion, sugars: parseFloat(value) });
        break;
    }
    onPerPortionChange(perPortion);
  };

  return (
    <IonGrid>
      <IonRow>
        <IonColLeft>{t("pieces.per.portion")}</IonColLeft>
        <IonColRight>
          <IonInputStyled
            value={perPortion.description}
            onIonChange={(e: any) =>
              handlePerPortionChange(PerPortionEnum.DESCRIPTION, e.target.value)
            }
          />
          <Units>{t(product.units.shortNameKey)}</Units>
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
      {/* {!sugarsValid() && <Error>{t("page.products.sugars.error")}</Error>} */}
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
  color: salmon;
  font-size: 0.7em;
  text-align: right;
`;
