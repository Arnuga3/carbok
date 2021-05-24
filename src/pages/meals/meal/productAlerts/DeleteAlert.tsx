import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { IonAlert } from "@ionic/react";
import { IMeal } from "../../../../classes/meal/IMeal";
import { IMealProduct } from "../../../../classes/meal/IMealProduct";
import { updateMeal } from "../../../../redux/actions/meals/actions";

interface Props {
  meal: IMeal;
  product: IMealProduct | null;
  open: boolean;
  onClose: () => void;
}

const slidingItems: any = document.querySelector(".prod-slide");

export const DeleteAlert: React.FC<Props> = ({ meal, product, open, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleMealProductDelete = () => {
    if (slidingItems) {
      slidingItems.closeOpened();
    }
    if (product) {
      dispatch(
        updateMeal({
          ...meal,
          products: meal.products.filter((prod) => prod.id !== product.id),
        })
      );
    }
  };

  return (
    <IonAlert
      isOpen={open}
      onDidDismiss={onClose}
      header={t("page.meals.delete.meal.product.alert.title")}
      subHeader={t("page.meals.delete.meal.product.alert.subtitle")}
      buttons={[
        { text: t("button.cancel"), role: "cancel" },
        {
          text: t("button.delete"),
          role: "destructive",
          handler: handleMealProductDelete,
        },
      ]}
    />
  );
};
