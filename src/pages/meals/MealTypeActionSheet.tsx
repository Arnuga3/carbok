import React from "react";
import { IonActionSheet } from "@ionic/react";
import { close } from "ionicons/icons";

import { mealTypes } from "../../resources/mealTypes";
import { useTranslation } from "react-i18next";

interface Props {
  open: any;
  onClose: any;
  onSelect: any;
}

export const MealTypeActionSheet: React.FC<Props> = ({
  open,
  onClose,
  onSelect,
}) => {
  const { t } = useTranslation();
  return (
    <IonActionSheet
      isOpen={open}
      onDidDismiss={onClose}
      cssClass="my-custom-class"
      buttons={[
        ...mealTypes.map((mealType) => ({
          text: t(mealType.nameKey),
          handler: () => onSelect(mealType),
        })),
        {
          text: t("button.cancel"),
          icon: close,
          role: "cancel",
          handler: onClose,
        },
      ]}
    ></IonActionSheet>
  );
};
