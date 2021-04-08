import React, { useEffect } from "react";
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
import { IMeal } from "../../../classes/meal/IMeal";

import { useMeals } from "../../../hooks/mealsHook";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { retrieveMeals } from "../../../redux/actions/mealsActions";

interface MealPageProps extends RouteComponentProps<{ id: string }> {}

export const Meal: React.FC<MealPageProps> = ({ match }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { meals, date } = useMeals();

  useEffect(() => {
    if (meals.length === 0) {
      dispatch(retrieveMeals(date));
    }
  }, []);

  const meal: IMeal | undefined = meals.find((meal) => meal.id === match.params.id);
  return (
    <IonPage>
      {meal ? (
        <>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonBackButton defaultHref={`/meals`} text={t("button.back")}/>
              </IonButtons>
              <IonTitle>{t(meal.type.nameKey)}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <MealProducts meal={meal} products={meal.products} />
          </IonContent>
        </>
      ) : (
        <p>{t("not.found")}</p>
      )}
    </IonPage>
  );
};
