import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import "moment/min/locales";
import styled from "styled-components";
import {
  IonContent,
  IonPage,
  IonIcon,
  IonList,
  IonButton,
  IonDatetime,
  IonItem,
  IonReorderGroup,
  IonFab,
  IonFabButton,
  IonButtons,
} from "@ionic/react";
import {
  addOutline,
  calendarOutline,
  chevronBackOutline,
  chevronForwardOutline,
} from "ionicons/icons";
import { AddMealActionSheet } from "./AddMealActionSheet";
import { DayMealCard } from "./DayMealCard";
import { Meal } from "../../classes/meal/Meal";
import { MealTypeEnum } from "../../classes/meal/MealTypeEnum";
import {
  addMeal,
  changeDate,
  retrieveMeals,
  updateMeals,
} from "../../redux/actions/meals/actions";
import { useMeals } from "../../hooks/mealsHook";
import { useTranslation } from "react-i18next";
import { useAppSettings } from "../../hooks/appSettingsHook";
import { dateService } from "../../services/DateService";
import { Header } from "../../components/styled/Header";

export const DayMeals: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { settings } = useAppSettings();
  const { meals, date } = useMeals();
  const [openActionSheet, setOpenActionSheet] = useState(false);

  useEffect(() => {
    if (meals.length === 0) {
      dispatch(retrieveMeals(dateService.dateNoTime(date)));
    }
  }, []);

  useEffect(() => {
    moment.locale(
      settings.language.indexOf("-") === -1
        ? settings.language
        : settings.language.substr(0, settings.language.indexOf("-"))
    );
  }, [settings.language]);

  const handleMealTypeSelect = (mealType: MealTypeEnum) => {
    dispatch(
      addMeal(
        new Meal(mealType, dateService.dateNoTime(date), [], meals.length)
      )
    );
  };

  const getPreviousDay = () => {
    dispatch(changeDate(dateService.previousDay(date)));
  };

  const getNextDay = () => {
    dispatch(changeDate(dateService.nextDay(date)));
  };

  const getCalendarDay = (date: Date) => {
    dispatch(changeDate(dateService.dateNoTime(date)));
  };

  const handleReorder = (e: any) => {
    dispatch(updateMeals(e.detail.complete(meals)));
  };

  return (
    <IonPage>
      <IonContent>
        <Header>
          <Buttons>
            <Button onClick={getPreviousDay} fill="clear">
              <IonIcon
                icon={chevronBackOutline}
                color="primary"
                slot="icon-only"
              />
            </Button>
            <DateSelect lines="none" color="light" mode="ios">
              <IonIcon
                icon={calendarOutline}
                color="primary"
                style={{ paddingRight: 12 }}
              />
              <IonDatetime
                doneText={t("button.done")}
                cancelText={t("button.cancel")}
                monthShortNames={moment.monthsShort()}
                value={moment(date).toISOString()}
                onIonChange={(e: any) => getCalendarDay(e.detail.value)}
              />
            </DateSelect>
            <Button onClick={getNextDay} fill="clear">
              <IonIcon
                icon={chevronForwardOutline}
                color="primary"
                slot="icon-only"
              />
            </Button>
          </Buttons>
        </Header>
        <List>
          <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
            {meals
              .sort((a, b) => a.order - b.order)
              .map((meal, i) => (
                <DayMealCard key={i} meal={meal} />
              ))}
          </IonReorderGroup>
        </List>
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton
            onClick={() => setOpenActionSheet(!openActionSheet)}
            color="primary"
          >
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
      <AddMealActionSheet
        open={openActionSheet}
        onSelect={handleMealTypeSelect}
        onClose={() => setOpenActionSheet(!openActionSheet)}
      />
    </IonPage>
  );
};

const Buttons = styled(IonButtons)`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Button = styled(IonButton)`
  border-radius: 100%;
  background-color: rgba(0,0,0,0.05);
  color: var(--ion-color-primary);
`;

const List = styled(IonList)`
  min-height: 100%;
  padding-bottom: 65px;
  z-index: 90;
`;

const DateSelect = styled(IonItem)`
  --border-radius: 32px;
`;
