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
  IonReorderGroup,
  IonFab,
  IonFabButton,
  IonButtons,
} from "@ionic/react";
import {
  addOutline,
  calendarClearOutline,
  chevronBackOutline,
  chevronForwardOutline,
  copyOutline,
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
import { DatetimeModal } from "../../components/common/DatetimeModal";

export const Meals: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { settings } = useAppSettings();
  const { meals, date } = useMeals();
  const [openActionSheet, setOpenActionSheet] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const changeBorderStyleThrottled = useRef(
    _.throttle((e) => changeBorderStyle(e, listRef.current), 500)
  );

  useEffect(() => {
    if (date && meals.length === 0) {
      dispatch(retrieveMeals(dateService.dateNoTime(date)));
    }
  }, [date]);

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

          <IonButton
            fill="solid"
            color="light"
            shape="round"
            size="large"
            onClick={() => setOpenCalendar(true)}
          >
            <IonIcon color="primary" icon={calendarClearOutline} slot="start"/>
            {moment(date).format("MMMM D, YYYY")}
          </IonButton>
          <DatetimeModal
            open={openCalendar}
            date={date}
            onClose={() => setOpenCalendar(false)}
            onDateChange={(date) => {
              if (date) {
                getCalendarDay(date);
              }
              setOpenCalendar(false);
            }}
          />

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
              {meals.length > 0 ? (
                meals
                  .sort((a, b) => a.order - b.order)
                  .map((meal, i) => (
                    <MealCard key={i} meal={meal} date={date} />
                  ))
              ) : (
                <QuickActionsWrapper>
                  <QuickAction
                    onClick={() => setOpenActionSheet(!openActionSheet)}
                  >
                    <small>
                      <IonIcon icon={addOutline} size="24px" />{" "}
                      {t("page.meals.quick.action.add.meal")}
                    </small>
                  </QuickAction>
                  <QuickAction onClick={() => setOpenCalendar(true)}>
                    <small>
                      <IonIcon icon={copyOutline} size="24px" />{" "}
                      {t("page.meals.quick.action.copy.meal")}
                    </small>
                  </QuickAction>
                </QuickActionsWrapper>
              )}
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

const QuickActionsWrapper = styled.div`
  display: flex;
  margin: 12px 24px;
`;

const QuickAction = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  width: 90px;
  height: 90px;
  border: 2px dashed var(--ion-color-light-darker);
  color: var(--ion-color-medium);
  border-radius: 8px;
  cursor: pointer;
  margin-right: 12px;
  padding: 4px;
`;
