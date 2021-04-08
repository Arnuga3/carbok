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
} from "@ionic/react";
import { add } from "ionicons/icons";
import styled from "styled-components";

import { MealTypeActionSheet } from "./MealTypeActionSheet";
import { MealCard } from "./MealCard";
import { Meal } from "../../classes/meal/Meal";

import { addMeal, retrieveMeals } from "../../redux/actions/mealsActions";
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

  return (
    <IonPage>
      <IonContentStyled>
        <IonHeader slot="fixed">
          <IonToolbar>
            <IonTitle>{t("page.meals.title")}</IonTitle>
          </IonToolbar>
        </IonHeader>
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
      </IonContentStyled>
      <MealTypeActionSheet
        open={openActionSheet}
        onSelect={handleMealTypeSelect}
        onClose={() => setOpenActionSheet(false)}
      />
    </IonPage>
  );
};

const IonContentStyled = styled(IonContent)`
  --padding-top: 50px;
`;

const AddButton = styled(IonButton)`
  margin: 12px;
`;
