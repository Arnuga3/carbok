import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { IonAlert } from "@ionic/react";
import { PortionType } from "../../../../../classes/productCarbs/PortionType";
import { Meal } from "../../../../../classes/meal/Meal";
import { MealProduct } from "../../../../../classes/meal/MealProduct";
import { updateMeal } from "../../../../../redux/actions/meals/actions";
import { getUnitShortKey } from "../../../../../resources/productUnits";
import { calcService } from "../../../../../services/CalculationService";
import { focusElement } from "../../../../../utils/eventHelpers";

interface Props {
  meal: Meal;
  product: MealProduct | null;
  open: boolean;
  onClose: () => void;
}

export const ChangePortionWeightAlert: React.FC<Props> = ({
  meal,
  product,
  open,
  onClose,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handlePortionSizeUpdate = (targetPortion: number) => {
    if (product) {
      const { carbs, sugars } = product.carbsData.per100;
      const portionType: PortionType = "weight";

      const mealUpdated: Meal = {
        ...meal,
        products: meal.products.map((prod: MealProduct) =>
          prod.id === product.id
            ? {
                ...prod,
                portionTypeInUse: portionType,
                mealProductCarbs: {
                  ...prod.mealProductCarbs,
                  per100: calcService.getCarbsFromWeight(
                    carbs,
                    sugars,
                    targetPortion
                  ),
                },
              }
            : prod
        ),
      };
      dispatch(updateMeal(mealUpdated));
    }
  };

  return (
    <IonAlert
      isOpen={open}
      onDidPresent={() => {
        const input: any = document.querySelector('ion-alert input');
        input.select();
      }}
      onDidDismiss={onClose}
      header={`${t("portion.size")} (${
        product ? t(getUnitShortKey(product.units)) : ""
      })`}
      inputs={[
        {
          name: "portion",
          value: product?.mealProductCarbs.per100.portion,
          type: "number",

        },
      ]}
      buttons={[
        { text: t("button.cancel") },
        {
          text: t("button.save"),
          handler: ({ portion }) => handlePortionSizeUpdate(portion),
        },
      ]}
    />
  );
};
