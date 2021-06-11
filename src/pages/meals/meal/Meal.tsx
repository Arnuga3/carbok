import React, { useEffect, useRef, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  IonBackButton,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  isPlatform,
  IonTitle,
  IonText,
} from "@ionic/react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import moment from "moment";
import { arrowBackOutline, ellipsisVertical } from "ionicons/icons";
import { Products } from "./Products";
import { ActionSheet } from "./ActionSheet";
import { NoteAlert } from "./alerts/NoteAlert";
import { useMeals } from "../../../hooks/mealsHook";
import { retrieveMeals } from "../../../redux/actions/meals/actions";
import { DeleteAlert } from "./alerts/DeleteAlert";
import { getMealKey } from "../../../resources/mealTypes";
import { MealCarbsChart } from "../../../components/charts/MealCarbsChart";
import { MealProductsChart } from "../../../components/charts/MealProductsChart";
import { CopyDatetime } from "./alerts/CopyDateTime";
import { CopyAlert, CopyState } from "./alerts/CopyAlert";
import { dateService } from "../../../services/DateService";

interface MealPageProps extends RouteComponentProps<{ id: string }> {}

export const Meal: React.FC<MealPageProps> = ({ match, history }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { meals, date } = useMeals();
  const [openActionSheet, setOpenActionSheet] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [openNoteAlert, setOpenNoteAlert] = useState(false);
  const [copyAlertState, setCopyAlertState] = useState<CopyState>({
    open: false,
    date: null,
  });

  const copyDatetime = useRef<HTMLIonDatetimeElement>(null);

  useEffect(() => {
    if (meals.length === 0) {
      dispatch(retrieveMeals(dateService.dateNoTime(date)));
    }
  }, []);

  const meal = meals.find((meal) => meal.id === match.params.id);

  return (
    <IonPage>
      <IonContent color="tertiary">
        <Header>
          <IonBackButton
            color="light"
            mode={isPlatform("ios") ? "ios" : "md"}
            defaultHref={`/meals`}
            icon={arrowBackOutline}
          />
          {meal && (
            <Date color="warning">
              <h4>{`${t(getMealKey(meal.type))}, ${moment(date).format(
                "MMM D"
              )}`}</h4>
            </Date>
          )}
          <IonButton
            color="light"
            fill="clear"
            onClick={() => setOpenActionSheet(true)}
          >
            <IonIcon icon={ellipsisVertical} />
          </IonButton>
        </Header>
        {meal && (
          <>
            {meal.products.length > 0 && (
              <Charts>
                <MealCarbsChart meal={meal} />
                <MealProductsChart meal={meal} />
              </Charts>
            )}
            <Products meal={meal} />
          </>
        )}
      </IonContent>
      <ActionSheet
        open={openActionSheet}
        onNote={() => setOpenNoteAlert(true)}
        onDelete={() => setOpenDeleteAlert(true)}
        onCopy={() => copyDatetime.current?.open()}
        onClose={() => setOpenActionSheet(false)}
      />
      <DeleteAlert
        meal={meal}
        history={history}
        open={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
      />
      <NoteAlert
        meal={meal}
        open={openNoteAlert}
        onClose={() => setOpenNoteAlert(false)}
      />
      <CopyDatetime
        ref={copyDatetime}
        onDateChange={(state) => setCopyAlertState(state)}
      />
      <CopyAlert
        history={history}
        meal={meal}
        copyState={copyAlertState}
        onClose={() => setCopyAlertState({ open: false, date: null })}
      />
    </IonPage>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
`;

const Date = styled(IonText)`
  align-text: center;
`;

const Charts = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  background-color: var(--ion-color-tertiary);
`;
