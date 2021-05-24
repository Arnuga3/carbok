import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { IonAlert } from "@ionic/react";
import { IMeal } from "../../../../classes/meal/IMeal";
import { IMealProduct } from "../../../../classes/meal/IMealProduct";
import { PortionType } from "../../../../classes/productCarbs/PortionType";
import CalculationService from "../../../../services/CalculationService";
import { updateMeal } from "../../../../redux/actions/meals/actions";

interface Props {
  meal: IMeal;
  product: IMealProduct | null;
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
  const c = new CalculationService();

  const handlePortionQuantityUpdate = (targetQuantity: number) => {
    if (product) {
      const portionType: PortionType = "quantity";

      const mealUpdated = {
        ...meal,
        products: meal.products.map((prod: IMealProduct) =>
          prod.id === product.id
            ? {
                ...prod,
                portionTypeInUse: portionType,
                mealProductCarbs: {
                  ...prod.mealProductCarbs,
                  perPortion: c.getCarbsFromQuantity(
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
