import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonList,
  IonButton,
  IonListHeader,
  IonText,
} from "@ionic/react";
import { add, chevronBackOutline, chevronForwardOutline } from "ionicons/icons";
import styled from "styled-components";
import moment from "moment";

import { MealTypeActionSheet } from "./MealTypeActionSheet";
import { MealCard } from "./MealCard";
import { Meal } from "../../classes/meal/Meal";

import {
  addMeal,
  changeDate,
  retrieveMeals,
} from "../../redux/actions/mealsActions";
import { useMeals } from "../../hooks/mealsHook";
import { IMealType } from "../../classes/mealType/IMealType";

export const Meals: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { meals, date } = useMeals();
  const [openActionSheet, setOpenActionSheet] = useState(false);

  useEffect(() => {
    if (meals.length === 0) {
      dispatch(retrieveMeals(date));
    }
  }, []);

  const handleMealTypeSelect = (mealType: IMealType) => {
    dispatch(addMeal(new Meal(mealType, [])));
  };

  const getPreviousDay = () => {
    const previousDay = moment(date).subtract(1, "day");
    dispatch(changeDate(new Date(previousDay.toISOString())));
  };

  const getNextDay = () => {
    const nextDay = moment(date).add(1, "day");
    dispatch(changeDate(new Date(nextDay.toISOString())));
  };

  return (
    <IonPage>
      <IonHeader slot="fixed">
        <IonToolbar>
          <IonTitle>{t("page.meals.title")}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonListHeader>
            <DateControl>
              <IonButton onClick={getPreviousDay}>
                <IonIcon icon={chevronBackOutline} />
              </IonButton>
              <IonText>
                <h3>{moment(date).format("MMM Do, YYYY")}</h3>
              </IonText>
              <IonButton onClick={getNextDay}>
                <IonIcon icon={chevronForwardOutline} />
              </IonButton>
            </DateControl>
          </IonListHeader>
          {meals.map((meal, i) => (
            <MealCard key={i} meal={meal} />
          ))}
          <AddButton
            expand="block"
            shape="round"
            size="large"
            onClick={() => setOpenActionSheet(true)}
          >
            <IonIcon slot="icon-only" icon={add} />
          </AddButton>
        </IonList>
      </IonContent>
      <MealTypeActionSheet
        open={openActionSheet}
        onSelect={handleMealTypeSelect}
        onClose={() => setOpenActionSheet(false)}
      />
    </IonPage>
  );
};

const DateControl = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-right: 16px;
`;

const AddButton = styled(IonButton)`
  margin: 12px;
`;
