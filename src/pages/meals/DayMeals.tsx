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
        <CalendarHeader>
          <IonButton fill="clear" onClick={getPreviousDay}>
            <IonIcon
              icon={chevronBackOutline}
              color="warning"
              slot="icon-only"
            />
          </IonButton>
          <DateSelect lines="none">
            <IonIcon
              icon={calendarOutline}
              color="secondary"
              style={{ paddingRight: 12 }}
            />
            <Datetime
              doneText={t("button.done")}
              cancelText={t("button.cancel")}
              monthShortNames={moment.monthsShort()}
              value={moment(date).toISOString()}
              onIonChange={(e: any) => getCalendarDay(e.detail.value)}
            />
          </DateSelect>
          <IonButton fill="clear" onClick={getNextDay}>
            <IonIcon
              icon={chevronForwardOutline}
              color="warning"
              slot="icon-only"
            />
          </IonButton>
        </CalendarHeader>
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
            color="tertiary"
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

const CalendarHeader = styled.div`
  height: 58px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  margin: 4px 4px 0 4px;
  background-color: var(--ion-color-primary);
`;

const List = styled(IonList)`
  min-height: 100%;
  padding-bottom: 65px;
  z-index: 90;
`;

const DateSelect = styled(IonItem)`
  --border-radius: 32px;
  --min-height: 24px;
  --max-height: 24px;
`;

const Datetime = styled(IonDatetime)`
  font-weight: bold;
  --padding-top: 12px;
`;
