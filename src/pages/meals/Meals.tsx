import React, { useState } from "react";
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
import { MealType } from "../../enums/MealType";

import { useDispatch } from "react-redux";
import { addMeal } from "../../redux/actions/mealsActions";
import { MealCard } from "./MealCard";
import { useMeals } from '../../hooks/mealsHook';

import { uuidv4 } from "./../../util/helpers";

export const Meals: React.FC = () => {
  const dispatch = useDispatch();
  const { meals } = useMeals();
  const [openActionSheet, setOpenActionSheet] = useState(false);

  const handleMealTypeSelect = (type: MealType) => {
    dispatch(
      addMeal({
        id: uuidv4(),
        type,
        dateTime: new Date(Date.now()),
        products: [],
      })
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