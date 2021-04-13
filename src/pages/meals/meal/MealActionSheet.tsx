import React from "react";
import { IonActionSheet } from "@ionic/react";
import { chatboxOutline, close, trashOutline } from "ionicons/icons";

import { useTranslation } from "react-i18next";

interface Props {
  open: any;
  onClose: any;
  onNote: any;
  onDelete: any;
}

export const MealActionSheet: React.FC<Props> = ({ open, onClose, onNote, onDelete }) => {
  const { t } = useTranslation();
  return (
    <IonActionSheet
      isOpen={open}
      onDidDismiss={onClose}
      buttons={[
        {
          text: t("button.note"),
          icon: chatboxOutline,
          handler: onNote,
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
