import React, { useEffect, useState } from "react";
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
  IonCard,
} from "@ionic/react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import moment from "moment";
import { ellipsisVertical } from "ionicons/icons";
import { Products } from "./Products";
import { ActionSheet } from "./ActionSheet";
import { NoteAlert } from "./alerts/NoteAlert";
import { useMeals } from "../../../hooks/mealsHook";
import { retrieveMeals } from "../../../redux/actions/meals/actions";
import { DeleteAlert } from "./alerts/DeleteAlert";
import { getMealKey } from "../../../resources/mealTypes";
import { MealCarbsChart } from "../../../components/common/MealCarbsChart";
import { MealProductsChart } from "../../../components/common/MealProductsChart";

interface MealPageProps extends RouteComponentProps<{ id: string }> {}

export const Meal: React.FC<MealPageProps> = ({ match, history }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { meals, date } = useMeals();
  const [openActionSheet, setOpenActionSheet] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [openNoteAlert, setOpenNoteAlert] = useState(false);

  useEffect(() => {
    if (meals.length === 0) {
      dispatch(retrieveMeals(date));
    }
  }, []);

  const meal = meals.find((meal) => meal.id === match.params.id);

  return (
    <IonPage>
      <IonHeader mode="ios">
        <HeaderContent>
          <IonBackButton
            mode={isPlatform("ios") ? "ios" : "md"}
            defaultHref={`/meals`}
            text={t("button.back")}
            color="primary"
          />
          &nbsp;
          {meal && (
            <IonTitle color="medium">{`${t(getMealKey(meal.type))}, ${moment(
              date
            ).format("MMM D")}`}</IonTitle>
          )}
          <IonButton
            color="primary"
            fill="clear"
            onClick={() => setOpenActionSheet(true)}
          >
            <IonIcon icon={ellipsisVertical} />
          </IonButton>
        </HeaderContent>
      </IonHeader>
      <IonContent>
        {meal && (
          <>
            {meal.products.length > 0 && (
              <IonCard>
                <CardContent>
                  <MealCarbsChart meal={meal} />
                  <MealProductsChart meal={meal} />
                </CardContent>
              </IonCard>
            )}
            <Products meal={meal} />
          </>
        )}
      </IonContent>
      <ActionSheet
        open={openActionSheet}
        onNote={() => setOpenNoteAlert(true)}
        onDelete={() => setOpenDeleteAlert(true)}
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
    </IonPage>
  );
};

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
`;

const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
`;
