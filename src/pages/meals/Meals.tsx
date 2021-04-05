import React, { useState } from "react";
import { useDispatch } from "react-redux";
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
import { MealType } from "../../classes/meal/MealTypeEnum";

import { addMeal } from "../../redux/actions/mealsActions";
import { useMeals } from '../../hooks/mealsHook';

export const Meals: React.FC = () => {
  const dispatch = useDispatch();
  const { meals } = useMeals();
  const [openActionSheet, setOpenActionSheet] = useState(false);

  const handleMealTypeSelect = (type: MealType) => {
    dispatch(
      addMeal(new Meal(type, []))
    );
  };

  return (
    <IonPage>
      <IonContentStyled>
        <IonHeader slot="fixed">
          <IonToolbar>
            <IonTitle>Meals</IonTitle>
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
            <IonIcon slot='icon-only' icon={add} />
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