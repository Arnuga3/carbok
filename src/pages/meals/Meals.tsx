import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonIcon,
  IonList,
  IonButton,
  IonDatetime,
  IonItem,
  IonReorderGroup,
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
  updateMeals,
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

  const handleReorder = (e: any) => {
    dispatch(updateMeals(date, e.detail.complete(meals)));
  };

  return (
    <IonPage>
      <IonHeader mode="ios" translucent>
        <HeaderContent>
          <IonButton fill="clear" onClick={getPreviousDay}>
            <IonIcon icon={chevronBackOutline} color="medium" />
          </IonButton>
          <DateSelect lines="none">
            <IonIcon icon={calendarOutline} color="primary" slot="start" />
            <Datetime
              doneText={t("button.done")}
              cancelText={t("button.cancel")}
              monthShortNames={moment.monthsShort()}
              value={moment(date).toISOString()}
              onIonChange={(e: any) => getCalendarDay(e.detail.value)}
            ></Datetime>
          </DateSelect>
          <IonButton fill="clear" onClick={getNextDay}>
            <IonIcon icon={chevronForwardOutline} color="medium" />
          </IonButton>
        </HeaderContent>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
            {meals.map((meal, i) => (
              <MealCard key={i} meal={meal} />
            ))}
          </IonReorderGroup>
          <AddButton
            color="primary"
            expand="block"
            shape="round"
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

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
`;

const DateSelect = styled(IonItem)`
  --border-radius: 25px;
`;

const Datetime = styled(IonDatetime)`
  color: var(--ion-color-medium);
  font-weight: bold;
`;

const AddButton = styled(IonButton)`
  margin: 12px;
`;
