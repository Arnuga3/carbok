import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import moment from "moment";
import { IonAlert } from "@ionic/react";
import { copyMeal } from "../../../../redux/actions/meals/actions";
import { Meal } from "../../../../classes/meal/Meal";

export interface CopyState {
  open: boolean;
  date: Date | null;
}

interface Props {
  meal: Meal | undefined;
  copyState: CopyState;
  onCopied: () => void;
  onClose: () => void;
  history?: any;
}

export const CopyAlert: React.FC<Props> = ({
  meal,
  copyState,
  onCopied,
  onClose,
}) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { date, open } = copyState;

  const handleCopy = () => {
    if (meal && date) {
      dispatch(copyMeal(date, meal));
    }
    onCopied();
  };

  return (
    <IonAlert
      isOpen={open}
      onDidDismiss={onClose}
      header={t("page.meals.copy.meal.alert.title", {
        date: moment(date).locale(i18n.language).format("MMMM D, YYYY"),
      })}
      buttons={[
        { text: t("button.cancel"), role: "cancel" },
        { text: t("button.copy"), handler: handleCopy },
      ]}
    />
  );
};