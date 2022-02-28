import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import moment from "moment";
import { IonAlert } from "@ionic/react";
import { copyMeal } from "../../../../redux/actions/meals/actions";
import { Meal } from "../../../../classes/meal/Meal";

export interface CopyMealConfirmState {
  open: boolean;
  date: Date | null;
}

interface Props {
  meal: Meal | undefined;
  open: boolean;
  date: Date | null;
  onCopied: () => void;
  onClose: () => void;
  history?: any;
}

export const CopyMealConfirm: React.FC<Props> = ({
  meal,
  open,
  date,
  onCopied,
  onClose,
}) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const handleCopy = () => {
    if (meal && date) {
      dispatch(copyMeal(date, meal));
    }
    onCopied();
  };

  return (
    <IonAlert
      isOpen={open}
      header={t("page.meals.copy.meal.alert.title", {
        date: moment(date).locale(i18n.language).format("MMMM D, YYYY"),
      })}
      buttons={[
        { text: t("button.cancel"), handler: onClose },
        { text: t("button.copy"), handler: handleCopy },
      ]}
    />
  );
};
