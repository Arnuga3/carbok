import React, { useState } from "react";
import styled from "styled-components";
import {
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonList,
  IonText,
} from "@ionic/react";
import {
  addOutline,
  chatbubbleOutline,
  layersOutline,
  pencil,
  scaleOutline,
  search,
  trashOutline,
} from "ionicons/icons";
import { MealProductListItem } from "../../../components/common/MealProductListItem";
import { ProductsSelectModal } from "./ProductsSelectModal";
import { ChangePortionWeightAlert } from "./productAlerts/ChangePortionWeightAlert";
import { ChangeQuantityAlert } from "./productAlerts/ChangeQuantityAlert";
import { DeleteAlert } from "./productAlerts/DeleteAlert";
import { Meal } from "../../../classes/meal/Meal";
import { MealProduct } from "../../../classes/meal/MealProduct";
import { toggleActionsSlide } from "../../../utils/eventHelpers";
import { DummyProductAlert } from "./productAlerts/DummyProductAlert";
import { ProductAvatar } from "./ProductAvatar";

interface Props {
  meal: Meal;
}
const MEALSPAGE = "meals-page";

export const Products: React.FC<Props> = ({ meal }) => {

  const [openProductsModal, setOpenProductsModal] = useState(false);
  const [openPortionSizeAlert, setOpenPortionSizeAlert] = useState(false);
  const [openPortionQuantityAlert, setOpenPortionQuantityAlert] =
    useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [openAddDummyProductAlert, setOpenAddDummyProductAlert] =
    useState(false);
  const [selectedProduct, setSelectedProduct] = useState<MealProduct | null>(
    null
  );

  const handlePortionSizeChange = (product: MealProduct) => {
    setSelectedProduct(product);
    setOpenPortionSizeAlert(true);
  };

  const handlePortionQunatityChange = (product: MealProduct) => {
    setSelectedProduct(product);
    setOpenPortionQuantityAlert(true);
  };

  const handleOnMealProductDelete = (product: MealProduct) => {
    setSelectedProduct(product);
    setOpenDeleteAlert(true);
  };

  return (
    <>
      {meal.note && (
        <Note>
          <IonItem lines="none" color="primary">
            <IonIcon
              icon={chatbubbleOutline}
              slot="start"
              color="secondary"
              size="small"
            />
            <IonText color="secondary">{meal.note}</IonText>
          </IonItem>
        </Note>
      )}
      <List>
        {meal.products.map((product, i) => (
          <IonItemSliding
            key={i}
            id={MEALSPAGE + i}
            onClick={() => toggleActionsSlide(MEALSPAGE + i)}
          >
            <Item detail lines="none">
              <ProductAvatar product={product} />
              <MealProductListItem product={product} />
            </Item>
            <ItemOptions>
              {product.portionType === "quantity" && (
                <SlidingAction
                  color="light"
                  onClick={() => handlePortionQunatityChange(product)}
                >
                  <IonIcon
                    icon={layersOutline}
                    slot="icon-only"
                    color="primary"
                  />
                </SlidingAction>
              )}
              <SlidingAction
                color="light"
                onClick={() => handlePortionSizeChange(product)}
              >
                <IonIcon icon={scaleOutline} slot="icon-only" color="primary" />
              </SlidingAction>
              <SlidingAction
                color="light"
                onClick={() => handleOnMealProductDelete(product)}
              >
                <IonIcon icon={trashOutline} slot="icon-only" color="primary" />
              </SlidingAction>
            </ItemOptions>
          </IonItemSliding>
        ))}
      </List>
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
      <ProductsSelectModal
        meal={meal}
        open={openProductsModal}
        onClose={() => setOpenProductsModal(false)}
      />
      <ChangePortionWeightAlert
        meal={meal}
        product={selectedProduct}
        open={openPortionSizeAlert}
        onClose={() => setOpenPortionSizeAlert(false)}
      />
      <ChangeQuantityAlert
        meal={meal}
        product={selectedProduct}
        open={openPortionQuantityAlert}
        onClose={() => setOpenPortionQuantityAlert(false)}
      />
      <DeleteAlert
        meal={meal}
        product={selectedProduct}
        open={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
      />
      <DummyProductAlert
        meal={meal}
        open={openAddDummyProductAlert}
        onClose={() => setOpenAddDummyProductAlert(false)}
      />
    </>
  );
};

const List = styled(IonList)`
  min-height: 100%;
  padding-top: 28px;
  padding-bottom: 65px;
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.5);
`;

const ItemOptions = styled(IonItemOptions)`
  dispay: flex;
  align-items: center;
`;

const Item = styled(IonItem)`
  --min-height: 70px;
  margin: 4px;
  border-radius: 12px;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.1);
`;

const SlidingAction = styled(IonItemOption)`
  width: 55px;
  height: 55px;
  margin: 4px;
  border-radius: 100%;
`;

const Note = styled.div`
  margin: 0 0 16px 12px;
`;
