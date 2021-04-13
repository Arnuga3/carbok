import React from "react";
import {
  IonCard,
  IonCardContent,
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
      <IonCardContentStyled>
        <div>
          <IonCardTitle>{t(meal.type.nameKey)}</IonCardTitle>
          <SmallText>{`${meal.products.length} ${t("products")}`}</SmallText>
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
            <NoteText>
              <NoteIcon
                slot="icon-only"
                icon={chatboxOutline}
                color="primary"
              />
              {meal.note}
            </NoteText>
          )}
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
  align-items: center;
`;

const SmallText = styled.div`
  font-size: 0.9em;
  color: var(--ion-color-medium);
`;

const NoteText = styled.div`
  font-size: 0.8em;
  color: var(--ion-color-medium);
`;

const NoteIcon = styled(IonIcon)`
  padding-right: 4px;
`;