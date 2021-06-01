import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { IonAlert } from "@ionic/react";
import { deleteMeal } from "../../../../redux/actions/meals/actions";
import { Meal } from "../../../../classes/meal/Meal";

interface Props {
  meal: Meal | undefined;
  open: boolean;
  onClose: () => void;
  history: any;
}

export const DeleteAlert: React.FC<Props> = ({
  meal,
  open,
  onClose,
  history,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (meal) {
      dispatch(deleteMeal(meal));
      history.goBack();
    }
  };

  return (
    <IonAlert
      isOpen={open}
      onDidDismiss={onClose}
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
  );
};
