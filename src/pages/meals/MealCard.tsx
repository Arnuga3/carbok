import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import moment from "moment";

import { IMeal } from "../../classes/meal/IMeal";
import { useTranslation } from "react-i18next";

interface Props {
  meal: IMeal;
}

export const MealCard: React.FC<Props> = ({ meal }) => {
  const { t } = useTranslation();
  return (
    <IonCard routerLink={`/meals/${meal.id}/products`}>
      <IonCardHeader>
        <IonCardTitle>{t(meal.type.nameKey)}</IonCardTitle>
        <IonCardSubtitle>
          {moment(meal.dateTime).format("MMM Do, YYYY")}
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>Total products: {meal?.products.length}</IonCardContent>
    </IonCard>
  );
};
