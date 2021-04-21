import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  isPlatform,
  IonTitle,
} from "@ionic/react";
import styled from "styled-components";
import { Products } from "./Products";
import { IMeal } from "../../../classes/meal/IMeal";
import { MealActionSheet } from "./MealActionSheet";

import { useMeals } from "../../../hooks/mealsHook";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  deleteMeal,
  retrieveMeals,
  updateMeal,
} from "../../../redux/actions/mealsActions";
import moment from "moment";
import { ellipsisVertical } from "ionicons/icons";

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

  const meal: IMeal | undefined = meals.find(
    (meal) => meal.id === match.params.id
  );

  const handleDelete = () => {
    if (meal) {
      dispatch(deleteMeal(meal));
      history.goBack();
    }
  };

  const handleNote = (note: string) => {
    if (meal && note) {
      dispatch(updateMeal({ ...meal, note }));
    }
  };
  // TODO - Add option to copy meal to another day
  return (
    <IonPage>
      <IonHeader mode="ios" translucent>
        <HeaderContent>
          <IonBackButton
            mode={isPlatform("ios") ? "ios" : "md"}
            defaultHref={`/meals`}
            text={t("button.back")}
            color="primary"
          />
          &nbsp;
          {meal && (
            <IonTitle color="medium">{`${t(meal.type.nameKey)}, ${moment(date).format(
              "MMM D"
            )}`}</IonTitle>
          )}
          <IonButton
            color="primary"
            fill="clear"
            onClick={() => setOpenActionSheet(true)}
          >
            <IonIcon icon={ellipsisVertical} slot="icon-only" />
          </IonButton>
        </HeaderContent>
      </IonHeader>
      <IonContent fullscreen>{meal && <Products meal={meal} />}</IonContent>
      <MealActionSheet
        open={openActionSheet}
        onNote={() => setOpenNoteAlert(true)}
        onDelete={() => setOpenDeleteAlert(true)}
        onClose={() => setOpenActionSheet(false)}
      />
      <IonAlert
        isOpen={openDeleteAlert}
        onDidDismiss={() => setOpenDeleteAlert(false)}
        header={t("page.meals.delete.meal.alert.title")}
        subHeader={t("page.meals.delete.meal.alert.subtitle")}
        buttons={[
          { text: t("button.cancel"), role: "cancel" },
          {
            text: t("button.delete"),
            role: "destructive",
            handler: handleDelete,
          },
        ]}
      />
      <IonAlert
        isOpen={openNoteAlert}
        onDidDismiss={() => setOpenNoteAlert(false)}
        header={t("page.meals.note.alert.title")}
        inputs={[
          {
            name: "note",
            value: meal?.note,
            type: "textarea",
          },
        ]}
        buttons={[
          { text: t("button.cancel") },
          {
            text: t("button.save"),
            handler: ({ note }) => handleNote(note),
          },
        ]}
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
