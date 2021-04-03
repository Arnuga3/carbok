import React from 'react';
import { IonActionSheet } from "@ionic/react";
import { close } from "ionicons/icons";

import { MealType } from "../../enums/MealType";

interface Props {
  open: any;
  onClose: any;
  onSelect: any;
}

export const MealTypeActionSheet: React.FC<Props> = ({
  open,
  onClose,
  onSelect,
}) => (
  <IonActionSheet
    isOpen={open}
    onDidDismiss={onClose}
    cssClass="my-custom-class"
    buttons={[
      {
        text: "Breakfast",
        handler: () => onSelect(MealType.BREAKFAST),
      },
      {
        text: "Lunch",
        handler: () => onSelect(MealType.LUNCH),
      },
      {
        text: "Dinner",
        handler: () => onSelect(MealType.DINNER),
      },
      {
        text: "Snack",
        handler: () => onSelect(MealType.SNACK),
      },
      {
        text: "Cancel",
        icon: close,
        role: "cancel",
        handler: onClose,
      },
    ]}
  ></IonActionSheet>
);
