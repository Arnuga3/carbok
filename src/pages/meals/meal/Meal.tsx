import React from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { MealProducts } from "./MealProducts";
import { IMeal } from "../../../interfaces/IMeal";

import { useMeals } from "../../../hooks/mealsHook";

interface MealPageProps extends RouteComponentProps<{ id: string }> {}

export const Meal: React.FC<MealPageProps> = ({ match }) => {
  const { meals } = useMeals();
  const meal: IMeal | undefined = meals.find((meal) => meal.id === match.params.id);
  return (
    <IonPage>
      {meal ? (
        <>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonBackButton defaultHref='/meals'/>
              </IonButtons>
              <IonTitle></IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <MealProducts products={meal.products} />
          </IonContent>
        </>
      ) : (
        <p>Whoops! Something went wrong...</p>
      )}
    </IonPage>
  );
};
