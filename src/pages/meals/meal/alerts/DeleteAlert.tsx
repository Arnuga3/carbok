import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { IMeal } from "../../../../classes/meal/IMeal";
import { IonAlert } from "@ionic/react";
import { deleteMeal } from "../../../../redux/actions/meals/actions";

interface Props {
  meal: IMeal | undefined;
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
