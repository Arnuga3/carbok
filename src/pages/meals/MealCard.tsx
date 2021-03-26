import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import moment from "moment";

import { Meal } from "../../interfaces/Meal";

interface Props {
  meal: Meal;
}

export const MealCard: React.FC<Props> = ({ meal }) => (
  <IonCard routerLink={`/meals/${meal.id}/products`}>
    <IonCardHeader>
      <IonCardTitle>{meal.type}</IonCardTitle>
      <IonCardSubtitle>
        {moment(meal.dateTime).format("MMM Do, YYYY")}
      </IonCardSubtitle>
    </IonCardHeader>
    <IonCardContent>Total products: {meal?.products.length}</IonCardContent>
  </IonCard>
);
