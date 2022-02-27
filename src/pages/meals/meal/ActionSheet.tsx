import React from "react";
import { IonActionSheet } from "@ionic/react";
import { chatboxOutline, close, copyOutline, trashOutline } from "ionicons/icons";

import { useTranslation } from "react-i18next";
import { CopyState } from "./copy-meal-modal/CopyAlert";

interface Props {
  open: any;
  onClose: any;
  onNote: any;
  onCopy: (state: CopyState) => void;
  onDelete: any;
}

export const ActionSheet: React.FC<Props> = ({
  open,
  onClose,
  onNote,
  onCopy,
  onDelete,
}) => {
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
          text: t("button.copy"),
          icon: copyOutline,
          handler: onCopy,
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
