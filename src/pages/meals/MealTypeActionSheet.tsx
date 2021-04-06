import React from 'react';
import { IonActionSheet } from "@ionic/react";
import { close } from "ionicons/icons";

import { mealTypes } from '../../resources/mealTypes';

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
      ...mealTypes.map((mealType) => ({
        text: mealType.nameKey,
        handler: () => onSelect(mealType)
      })),
      {
        text: "Cancel",
        icon: close,
        role: "cancel",
        handler: onClose,
      },
    ]}
  ></IonActionSheet>
);
