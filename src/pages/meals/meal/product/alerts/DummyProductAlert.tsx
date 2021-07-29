import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { IonAlert } from "@ionic/react";
import { IMeal } from "../../../../../classes/meal/IMeal";
import { updateMeal } from "../../../../../redux/actions/meals/actions";
import { MealDummyProduct } from "../../../../../classes/meal/MealDummyProduct";
import { MealProduct } from "../../../../../classes/meal/MealProduct";
import { Meal } from "../../../../../classes/meal/Meal";

interface Props {
  meal: IMeal | undefined;
  open: boolean;
  onClose: () => void;
}

interface AlertData {
  name: string;
  carbs: number;
}

export const DummyProductAlert: React.FC<Props> = ({ meal, open, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleAdd = ({ name, carbs }: AlertData) => {
    if (meal && name && carbs) {
      const dummyProduct = new MealDummyProduct(name, carbs) as MealProduct;
      dummyProduct.dummy = true;

      const mealUpdated: Meal = {
        ...meal,
        products: [...meal.products, dummyProduct],
      };

      dispatch(updateMeal(mealUpdated));
    }
  };

  return (
    <IonAlert
      isOpen={open}
      onDidDismiss={onClose}
      header={t("page.meals.dummy.product.alert.title")}
      inputs={[
        {
          name: "name",
          placeholder: t("page.meals.dummy.product.alert.name"),
          type: "textarea",
          attributes: {
            maxlength: 100,
          },
        },
        {
          name: "carbs",
          placeholder: t("page.meals.dummy.product.alert.carbs"),
          type: "number",
          attributes: {
            maxlength: 3,
            inputmode: "decimal",
          },
        },
      ]}
      buttons={[
        { text: t("button.cancel") },
        {
          text: t("button.save"),
          handler: (data: AlertData) => handleAdd(data),
        },
      ]}
    />
  );
};
