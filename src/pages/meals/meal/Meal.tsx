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
import { MealProducts } from "./Products";
import { IMeal } from "../../../classes/meal/IMeal";

import { useMeals } from "../../../hooks/mealsHook";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { retrieveMeals } from "../../../redux/actions/mealsActions";
import moment from "moment";

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

  const meal: IMeal | undefined = meals.find(
    (meal) => meal.id === match.params.id
  );
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/meals`} text={t("button.back")} />
          </IonButtons>
          {meal && <IonTitle>{`${moment(date).format("Do MMM")} - ${t(meal.type.nameKey)}`}</IonTitle>}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {meal && <MealProducts meal={meal} products={meal.products} />}
      </IonContent>
    </IonPage>
  );
};
