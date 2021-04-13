import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonText,
} from "@ionic/react";
import styled from "styled-components";

import { IMeal } from "../../classes/meal/IMeal";
import { useTranslation } from "react-i18next";
import { MealProductsChart } from "../../components/common/MealProductsChart";
import { CalculationService } from "../../services/CalculationService";
import { chartColors } from "../../resources/config";
import { CircleBadge } from "../../components/common/CircleBadge";
import { chatboxOutline } from "ionicons/icons";

interface Props {
  meal: IMeal;
}

export const MealCard: React.FC<Props> = ({ meal }) => {
  const { t } = useTranslation();
  const calculation = new CalculationService();
  return (
    <IonCard routerLink={`/meals/${meal.id}/products`}>
      <CardHeader>
        <IonCardTitle>{t(meal.type.nameKey)}</IonCardTitle>
        <IonCardSubtitle>{`${meal.products.length} ${t("products")}`}</IonCardSubtitle>
      </CardHeader>
      <IonCardContentStyled>
        <div>
          <CardSubtitle>
            <CircleBadge color={chartColors.carbohydrates} />
            <IonText>
              {`${t("carbohydrates")}: ${calculation.getMealTotalCarbs(
                meal.products
              )}${t("units.grams.short")}`}
            </IonText>
          </CardSubtitle>
          <CardSubtitle>
            <CircleBadge color={chartColors.sugars} />
            <IonText>
              {` ${t("of.which.sugars")}: ${calculation.getMealTotalSugars(
                meal.products
              )}${t("units.grams.short")}`}
            </IonText>
          </CardSubtitle>
          {meal.note && (
            <NoteIcon slot="icon-only" icon={chatboxOutline} color="primary" />
          )}
        </div>
        <MealProductsChart meal={meal} />
      </IonCardContentStyled>
    </IonCard>
  );
};

const CardHeader = styled(IonCardHeader)`
  display: flex;
  justify-content: space-between;
`;

const IonCardContentStyled = styled(IonCardContent)`
  display: flex;
  justify-content: space-between;
`;

const CardSubtitle = styled(IonText)`
  display: flex;
  align-items: center;
`;

const NoteIcon = styled(IonIcon)`
  padding: 8px 0;
`;
