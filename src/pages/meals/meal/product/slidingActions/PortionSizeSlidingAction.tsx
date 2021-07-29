import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import { scaleOutline } from "ionicons/icons";
import { Meal } from "../../../../../classes/meal/Meal";
import { MealProduct } from "../../../../../classes/meal/MealProduct";
import { ChangePortionWeightAlert } from "../alerts/ChangePortionWeightAlert";
import { SlidingAction } from "../../../../../components/styled/SlidingAction";

interface Props {
  meal: Meal;
  product: MealProduct;
}

export const PortionSizeSlidingAction: React.FC<Props> = ({
  meal,
  product,
}) => {
  const [openPortionSizeAlert, setOpenPortionSizeAlert] = useState(false);

  return (
    <>
      <SlidingAction
        color="light"
        onClick={() => setOpenPortionSizeAlert(true)}
      >
        <IonIcon icon={scaleOutline} slot="icon-only" color="primary" />
      </SlidingAction>
      <ChangePortionWeightAlert
        meal={meal}
        product={product}
        open={openPortionSizeAlert}
        onClose={() => setOpenPortionSizeAlert(false)}
      />
    </>
  );
};
