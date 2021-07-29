import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import { layersOutline } from "ionicons/icons";
import { Meal } from "../../../../../classes/meal/Meal";
import { MealProduct } from "../../../../../classes/meal/MealProduct";
import { SlidingAction } from "../../../../../components/styled/SlidingAction";
import { ChangeQuantityAlert } from "../alerts/ChangeQuantityAlert";

interface Props {
  meal: Meal;
  product: MealProduct;
}

export const PortionQuantitySlidingAction: React.FC<Props> = ({ meal, product }) => {
  const [openPortionQuantityAlert, setOpenPortionQuantityAlert] =
    useState(false);

  return (
    <>
      <SlidingAction
        color="light"
        onClick={() => setOpenPortionQuantityAlert(true)}
      >
        <IonIcon icon={layersOutline} slot="icon-only" color="primary" />
      </SlidingAction>

      <ChangeQuantityAlert
        meal={meal}
        product={product}
        open={openPortionQuantityAlert}
        onClose={() => setOpenPortionQuantityAlert(false)}
      />
    </>
  );
};
