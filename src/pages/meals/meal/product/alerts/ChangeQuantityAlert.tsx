import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { IonAlert } from "@ionic/react";
import { PortionType } from "../../../../../classes/productCarbs/PortionType";
import { calcService } from "../../../../../services/CalculationService";
import { updateMeal } from "../../../../../redux/actions/meals/actions";
import { Meal } from "../../../../../classes/meal/Meal";
import { MealProduct } from "../../../../../classes/meal/MealProduct";

interface Props {
  meal: Meal;
  product: MealProduct | null;
  open: boolean;
  onClose: () => void;
}

export const ChangeQuantityAlert: React.FC<Props> = ({
  meal,
  product,
  open,
  onClose,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handlePortionQuantityUpdate = (targetQuantity: number) => {
    if (product) {
      const portionType: PortionType = "quantity";

      const mealUpdated = {
        ...meal,
        products: meal.products.map((prod: MealProduct) =>
          prod.id === product.id
            ? {
                ...prod,
                portionTypeInUse: portionType,
                mealProductCarbs: {
                  ...prod.mealProductCarbs,
                  perPortion: calcService.getCarbsFromQuantity(
                    product.carbsData.perPortion,
                    targetQuantity
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
      header={`${t("quantity")} ${
        product && product.carbsData.perPortion?.description
          ? `(${product.carbsData.perPortion?.description})`
          : ""
      }`}
      inputs={[
        {
          name: "quantity",
          value: product?.mealProductCarbs.perPortion.quantity,
          type: "number",
        },
      ]}
      buttons={[
        { text: t("button.cancel") },
        {
          text: t("button.save"),
          handler: ({ quantity }) => handlePortionQuantityUpdate(quantity),
        },
      ]}
    />
  );
};
