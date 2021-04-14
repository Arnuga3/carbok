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
  IonButtons,
  IonDatetime,
} from "@ionic/react";
import {
  calendarOutline,
  chevronBackOutline,
  chevronForwardOutline,
} from "ionicons/icons";
import styled from "styled-components";
import moment from "moment";
import "moment/min/locales";

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
import { useTranslation } from "react-i18next";
import { useAppSettings } from "../../hooks/appSettingsHook";

export const Meals: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { settings } = useAppSettings();
  const { meals, date } = useMeals();
  const [openActionSheet, setOpenActionSheet] = useState(false);

  useEffect(() => {
    if (meals.length === 0) {
      dispatch(retrieveMeals(date));
    }
  }, []);

  useEffect(() => {
    moment.locale(
      settings.language.indexOf("-") === -1
        ? settings.language
        : settings.language.substr(0, settings.language.indexOf("-"))
    );
  }, [settings.language]);

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

  const getCalendarDay = (date: Date) => {
    dispatch(changeDate(date));
  };

  return (
    <IonPage>
      <IonHeader slot="fixed">
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonButton fill="clear" onClick={getPreviousDay}>
              <IonIcon
                icon={chevronBackOutline}
                slot="icon-only"
                color="secondary"
              />
            </IonButton>
          </IonButtons>
          <IonButtonsCenter>
            <IonIcon
              icon={calendarOutline}
              color="secondary"
              slot="icon-only"
            />
            <IonDatetime
              doneText={t("button.done")}
              cancelText={t("button.cancel")}
              monthShortNames={moment.monthsShort()}
              value={moment(date).toISOString()}
              onIonChange={(e: any) => getCalendarDay(e.detail.value)}
            ></IonDatetime>
          </IonButtonsCenter>
          <IonButtons slot="end">
            <IonButton fill="clear" onClick={getNextDay}>
              <IonIcon
                icon={chevronForwardOutline}
                slot="icon-only"
                color="secondary"
              />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {meals.map((meal, i) => (
            <MealCard key={i} meal={meal} />
          ))}
          <AddButton
            color="secondary"
            expand="block"
            shape="round"
            size="large"
            onClick={() => setOpenActionSheet(true)}
          >
            {t("page.meals.button.add.meal")}
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

const IonButtonsCenter = styled(IonButtons)`
  display: flex;
  justify-content: center;
`;

const AddButton = styled(IonButton)`
  margin: 12px;
`;
