import React from "react";
import {
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonText,
} from "@ionic/react";
import styled from "styled-components";

import { IMeal } from "../../classes/meal/IMeal";
import { useTranslation } from "react-i18next";
import { MealProductsChart } from "../../components/common/MealProductsChart";
import { CalculationService } from "../../services/CalculationService";
import { chartColors } from "../../resources/config";

interface Props {
  meal: IMeal;
}

export const MealCard: React.FC<Props> = ({ meal }) => {
  const { t } = useTranslation();
  const calculation = new CalculationService();
  return (
    <IonCard routerLink={`/meals/${meal.id}/products`}>
      <IonCardContentStyled>
        <div>
          <IonCardTitle>{t(meal.type.nameKey)}</IonCardTitle>
          <CardSubtitle>
            <Badge color={chartColors.carbohydrates} />
            <IonText>
              {`${t("carbohydrates")}: ${calculation.getMealTotalCarbs(
                meal.products
              )}${t("units.grams.short")}`}
            </IonText>
          </CardSubtitle>
          <CardSubtitle>
            <Badge color={chartColors.sugars} />
            <IonText>
              {` ${t("of.which.sugars")}: ${calculation.getMealTotalSugars(
                meal.products
              )}${t("units.grams.short")}`}
            </IonText>
          </CardSubtitle>
          <SmallText>{meal.products.length} Products</SmallText>
        </div>
        <MealProductsChart meal={meal} />
      </IonCardContentStyled>
    </IonCard>
  );
};

const IonCardContentStyled = styled(IonCardContent)`
  display: flex;
  justify-content: space-between;
`;

const CardSubtitle = styled(IonCardSubtitle)`
  display: flex;
`;

const Badge = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 5px;
  background-color: ${({ color }) => color};
`;

const SmallText = styled.div`
  font-size: 0.8em;
`;
