import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { IonAlert } from "@ionic/react";
import { IMeal } from "../../../../classes/meal/IMeal";
import { updateMeal } from "../../../../redux/actions/meals/actions";
import { IMealProduct } from "../../../../classes/meal/IMealProduct";
import { PortionType } from "../../../../classes/productCarbs/PortionType";
import CalculationService from "../../../../services/CalculationService";
import { getUnitShortKey } from "../../../../resources/productUnits";

interface Props {
  meal: IMeal;
  product: IMealProduct | null;
  open: boolean;
  onClose: () => void;
}

export const ChangePortionWeightAlert: React.FC<Props> = ({ meal, product, open, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const c = new CalculationService();

  const handlePortionSizeUpdate = (targetPortion: number) => {
    if (product) {
      const { carbs, sugars } = product.carbsData.per100;
      const portionType: PortionType = "weight";

      const mealUpdated = {
        ...meal,
        products: meal.products.map((prod: IMealProduct) =>
          prod.id === product.id
            ? {
                ...prod,
                portionTypeInUse: portionType,
                mealProductCarbs: {
                  ...prod.mealProductCarbs,
                  per100: c.getCarbsFromWeight(carbs, sugars, targetPortion),
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
      onDidDismiss={onClose}
      header={`${t("portion.size")} (${
        product ? t(getUnitShortKey(product.units.type)) : ""
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
