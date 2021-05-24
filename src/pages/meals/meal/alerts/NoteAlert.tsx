import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { IonAlert } from "@ionic/react";
import { IMeal } from "../../../../classes/meal/IMeal";
import { updateMeal } from "../../../../redux/actions/meals/actions";

interface Props {
  meal: IMeal | undefined;
  open: boolean;
  onClose: () => void;
}

export const NoteAlert: React.FC<Props> = ({ meal, open, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleNote = (note: string) => {
    if (meal && note) {
      dispatch(updateMeal({ ...meal, note }));
    }
  };

  return (
    <IonAlert
      isOpen={open}
      onDidDismiss={onClose}
      header={t("page.meals.note.alert.title")}
      inputs={[
        {
          name: "note",
          value: meal?.note,
          type: "textarea",
          attributes: {
            maxlength: 100,
          },
        },
      ]}
      buttons={[
        { text: t("button.cancel") },
        {
          text: t("button.save"),
          handler: ({ note }) => handleNote(note),
        },
      ]}
    />
  );
};
