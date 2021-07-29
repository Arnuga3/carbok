import React, { useState } from "react";
import { IonFab, IonFabButton, IonFabList, IonIcon } from "@ionic/react";
import { addOutline, pencil, search } from "ionicons/icons";
import { ProductSelectModal } from "./ProductSelectModal";
import { Meal } from "../../../classes/meal/Meal";
import { DummyProductAlert } from "./product/alerts/DummyProductAlert";

interface Props {
  meal: Meal;
}

export const AddProductButton: React.FC<Props> = ({ meal }) => {
  const [openProductsModal, setOpenProductsModal] = useState(false);
  const [openAddDummyProductAlert, setOpenAddDummyProductAlert] =
    useState(false);

  return (
    <>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton color="secondary">
          <IonIcon icon={addOutline} />
        </IonFabButton>
        <IonFabList side="top">
          <IonFabButton
            onClick={() => setOpenProductsModal(true)}
            color="tertiary"
          >
            <IonIcon icon={search} />
          </IonFabButton>
          <IonFabButton
            onClick={() => setOpenAddDummyProductAlert(true)}
            color="tertiary"
          >
            <IonIcon icon={pencil} />
          </IonFabButton>
        </IonFabList>
      </IonFab>
      <ProductSelectModal
        meal={meal}
        open={openProductsModal}
        onClose={() => setOpenProductsModal(false)}
      />
      <DummyProductAlert
        meal={meal}
        open={openAddDummyProductAlert}
        onClose={() => setOpenAddDummyProductAlert(false)}
      />
    </>
  );
};
