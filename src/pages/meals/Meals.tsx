import React, { useState, useEffect, useRef } from "react";
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
import { MealCard } from "./MealCard";
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
import { Toolbar } from "../../components/styled/Toolbar";
import _ from "lodash";
import { changeBorderStyle } from "../../utils/eventHelpers";

export const Meals: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { settings } = useAppSettings();
  const { meals, date } = useMeals();
  const [openActionSheet, setOpenActionSheet] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const changeBorderStyleThrottled = useRef(
    _.throttle((e) => changeBorderStyle(e, listRef.current), 500)
  );

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
      <Toolbar>
        <ButtonWrapper>
          <IonButtons>
            <IonButton onClick={getPreviousDay} color="primary">
              <IonIcon icon={chevronBackOutline} slot="icon-only" />
            </IonButton>
          </IonButtons>
          <DateSelect lines="none" mode="ios">
            <IonIcon
              icon={calendarOutline}
              color="primary"
              style={{ paddingRight: 12 }}
            />
            <DateTime
              doneText={t("button.done")}
              cancelText={t("button.cancel")}
              monthShortNames={moment.monthsShort()}
              value={moment(date).toISOString()}
              onIonChange={(e: any) => getCalendarDay(e.detail.value)}
            />
          </DateSelect>
          <IonButton onClick={getNextDay} color="primary">
            <IonIcon icon={chevronForwardOutline} slot="icon-only" />
          </IonButton>
        </ButtonWrapper>
      </Toolbar>
      <ListWrapper ref={listRef}>
        <IonContent
          scrollEvents
          onIonScroll={(e) => changeBorderStyleThrottled.current(e)}
        >
          <List>
            <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
              {meals
                .sort((a, b) => a.order - b.order)
                .map((meal, i) => (
                  <MealCard key={i} meal={meal} date={date} />
                ))}
            </IonReorderGroup>
          </List>
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton
              onClick={() => setOpenActionSheet(!openActionSheet)}
              color="secondary"
            >
              <IonIcon icon={addOutline} />
            </IonFabButton>
          </IonFab>
        </IonContent>
      </ListWrapper>
      <AddMealActionSheet
        open={openActionSheet}
        onSelect={handleMealTypeSelect}
        onClose={() => setOpenActionSheet(!openActionSheet)}
      />
    </IonPage>
  );
};

const ButtonWrapper = styled(IonButtons)`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ListWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const List = styled(IonList)`
  min-height: 100%;
  padding-bottom: 65px;
  z-index: 90;
  padding-top: 0;
`;

const DateSelect = styled(IonItem)`
  border-radius: 32px;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.1);
`;

const DateTime = styled(IonDatetime)`
  color: var(--ion-color-medium);
`;
