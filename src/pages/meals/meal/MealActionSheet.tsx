import React from "react";
import { IonActionSheet } from "@ionic/react";
import { chatbubbleOutline, close, trashOutline } from "ionicons/icons";

import { useTranslation } from "react-i18next";

interface Props {
  open: any;
  onClose: any;
  onDelete: any;
}
// TODO - Implement add note functionality
export const MealActionSheet: React.FC<Props> = ({ open, onClose, onDelete }) => {
  const { t } = useTranslation();
  return (
    <IonActionSheet
      isOpen={open}
      onDidDismiss={onClose}
      buttons={[
        {
          text: t("button.add.note"),
          icon: chatbubbleOutline,
          handler: onClose,
        },
        {
          text: t("button.delete"),
          role: "destructive",
          icon: trashOutline,
          handler: onDelete,
        },
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
