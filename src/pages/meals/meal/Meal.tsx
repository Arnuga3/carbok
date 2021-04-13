import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
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
import { ellipsisVerticalOutline } from "ionicons/icons";

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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton
              defaultHref={`/meals`}
              text={t("button.back")}
              color="secondary"
            />
          </IonButtons>
          {meal && (
            <IonTitle>{`${moment(date).format("D MMMM")} - ${t(
              meal.type.nameKey
            )}`}</IonTitle>
          )}
          <IonButtons slot="end">
            <IonButton
              color="secondary"
              onClick={() => setOpenActionSheet(true)}
            >
              <IonIcon icon={ellipsisVerticalOutline} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {meal && <Products meal={meal} />}
      </IonContent>
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
