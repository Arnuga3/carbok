import React from "react";
import { IonActionSheet } from "@ionic/react";
import { close } from "ionicons/icons";

import { getMealKey, mealTypes } from "../../resources/mealTypes";
import { useTranslation } from "react-i18next";

interface Props {
  open: any;
  onClose: any;
  onSelect: any;
}

export const AddMealActionSheet: React.FC<Props> = ({
  open,
  onClose,
  onSelect,
}) => {
  const { t } = useTranslation();
  return (
    <IonActionSheet
      isOpen={open}
      onDidDismiss={onClose}
      buttons={[
        ...mealTypes.map((mealType) => ({
          text: t(getMealKey(mealType)),
          handler: () => onSelect(mealType),
        })),
        {
          text: t("button.cancel"),
          icon: close,
          role: "cancel",
        },
      ]}
    ></IonActionSheet>
  );
};
