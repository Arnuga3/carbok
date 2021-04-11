import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonIcon,
  IonList,
  IonButton,
  IonText,
  IonButtons,
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
  const dispatch = useDispatch();
  const { meals, date } = useMeals();
  const [openActionSheet, setOpenActionSheet] = useState(false);

  useEffect(() => {
    if (meals.length === 0) {
      dispatch(retrieveMeals(date));
    }
  }, []);

  const handleMealTypeSelect = (mealType: IMealType) => {
    dispatch(addMeal(new Meal(mealType, date, [])));
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
        <IonToolbar color="primary">
          <DateControl>
            <IonButton fill="clear" onClick={getPreviousDay}>
              <IonIcon icon={chevronBackOutline} slot="icon-only" />
            </IonButton>
            <IonText>
              <h3>{moment(date).format("MMM Do, YYYY")}</h3>
            </IonText>
            <IonButton fill="clear" onClick={getNextDay}>
              <IonIcon icon={chevronForwardOutline} slot="icon-only" />
            </IonButton>
          </DateControl>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
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

const DateControl = styled(IonButtons)`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const AddButton = styled(IonButton)`
  margin: 12px;
`;
