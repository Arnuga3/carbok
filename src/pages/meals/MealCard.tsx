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

interface Props {
  meal: IMeal;
}

export const MealCard: React.FC<Props> = ({ meal }) => (
  <IonCard routerLink={`/meals/${meal.id}/products`}>
    <IonCardHeader>
      <IonCardTitle>{meal.type.nameKey}</IonCardTitle>
      <IonCardSubtitle>
        {moment(meal.dateTime).format("MMM Do, YYYY")}
      </IonCardSubtitle>
    </IonCardHeader>
    <IonCardContent>Total products: {meal?.products.length}</IonCardContent>
  </IonCard>
);
