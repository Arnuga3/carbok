import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import { Meal } from "../../../../../classes/meal/Meal";
import { MealProduct } from "../../../../../classes/meal/MealProduct";
import { DeleteAlert } from "../alerts/DeleteAlert";
import { SlidingAction } from "../../../../../components/styled/SlidingAction";

interface Props {
  meal: Meal;
  product: MealProduct;
}
export const DeleteSlidingAction: React.FC<Props> = ({
  meal,
  product,
}) => {
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  return (
    <>
      <SlidingAction
        color="light"
        onClick={() => setOpenDeleteAlert(true)}
      >
        <IonIcon icon={trashOutline} slot="icon-only" color="primary" />
      </SlidingAction>
      <DeleteAlert
        meal={meal}
        product={product}
        open={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
      />
    </>
  );
};
