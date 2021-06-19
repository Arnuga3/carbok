import React from "react";
import { useTranslation } from "react-i18next";
import { IonAlert } from "@ionic/react";

interface Props {
  open: boolean;
  value: string;
  onClose: () => void;
  onFilter: (filter: string) => void;
}

export const FilterAlert: React.FC<Props> = ({ open, value, onClose, onFilter }) => {
  const { t } = useTranslation();
  return (
    <IonAlert
      isOpen={open}
      onDidDismiss={onClose}
      header={t("page.products.filter.header")}
      inputs={[
        {
          type: "radio",
          label: t("page.products.filter.products.all"),
          value: "all",
          checked: value === "all",
        },
        {
          type: "radio",
          label: t("page.products.filter.products.default"),
          value: "default",
          checked: value === "default",
        },
        {
          type: "radio",
          label: t("page.products.filter.products.my"),
          value: "my",
          checked: value === "my",
        },
      ]}
      buttons={[
        { text: t("button.close"), role: "cancel" },
        {
          text: t("button.ok"),
          role: "destructive",
          handler: (value) => onFilter(value),
        },
      ]}
    />
  );
};