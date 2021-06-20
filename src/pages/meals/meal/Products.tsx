import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  IonAvatar,
  IonFab,
  IonFabButton,
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
  scaleOutline,
  trashOutline,
} from "ionicons/icons";
import { CircleBadge } from "../../../components/common/CircleBadge";
import { MealProductListItem } from "../../../components/common/MealProductListItem";
import { ProductsSelectModal } from "./ProductsSelectModal";
import { ChangePortionWeightAlert } from "./productAlerts/ChangePortionWeightAlert";
import { ChangeQuantityAlert } from "./productAlerts/ChangeQuantityAlert";
import { DeleteAlert } from "./productAlerts/DeleteAlert";
import { categoryColours } from "../../../resources/config";
import { getCatKey } from "../../../resources/productCategories";
import { CircleBadgeMultiColor } from "../../../components/common/CircleBadgeMultiColor";
import { getCategoriesColours } from "../../products/util";
import { Meal } from "../../../classes/meal/Meal";
import { MealProduct } from "../../../classes/meal/MealProduct";

interface Props {
  meal: Meal;
}
const MEALSPAGE = "meals-page";

export const Products: React.FC<Props> = ({ meal }) => {
  const { t } = useTranslation();

  const [openProductsModal, setOpenProductsModal] = useState(false);
  const [openPortionSizeAlert, setOpenPortionSizeAlert] = useState(false);
  const [openPortionQuantityAlert, setOpenPortionQuantityAlert] =
    useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<MealProduct | null>(null);

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

  const toggleActionsSlide = async (selector: string) => {
    const productEl: any = document.querySelector("#" + selector);
    const openItemNum = await productEl.getOpenAmount();
    if (productEl && openItemNum === 0) {
      productEl.open();
    } else {
      productEl.close();
    }
  };

  return (
    <>
      {meal.note && (
        <Note>
          <IonItem lines="none" color="tertiary">
            <IonIcon
              icon={chatbubbleOutline}
              slot="start"
              color="secondary"
              size="small"
            />
            <IonText color="light">{meal.note}</IonText>
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
            <IonItem detail lines="none">
              <IonAvatar slot="start">
                {product.categories.length === 1 && (
                  <CircleBadge
                    color={categoryColours[product.categories[0]]}
                    size={40}
                  >
                    {t(getCatKey(product.categories[0])).slice(0, 3)}
                  </CircleBadge>
                )}
                {product.categories.length > 1 && (
                  <CircleBadgeMultiColor
                    colors={getCategoriesColours(product.categories)}
                    size={40}
                  >
                    {t(getCatKey("mix"))}
                  </CircleBadgeMultiColor>
                )}
              </IonAvatar>
              <MealProductListItem product={product} />
            </IonItem>
            <IonItemOptions>
              {product.portionType === "quantity" && (
                <SlidingAction
                  color="primary"
                  onClick={() => handlePortionQunatityChange(product)}
                >
                  <IonIcon icon={layersOutline} slot="icon-only" />
                </SlidingAction>
              )}
              <SlidingAction
                color="secondary"
                onClick={() => handlePortionSizeChange(product)}
              >
                <IonIcon icon={scaleOutline} slot="icon-only" />
              </SlidingAction>
              <SlidingAction
                color="danger"
                onClick={() => handleOnMealProductDelete(product)}
              >
                <IonIcon icon={trashOutline} slot="icon-only" />
              </SlidingAction>
            </IonItemOptions>
          </IonItemSliding>
        ))}
      </List>
      <IonFab vertical="bottom" horizontal="center" slot="fixed">
        <IonFabButton
          onClick={() => setOpenProductsModal(true)}
          color="primary"
        >
          <IonIcon icon={addOutline} />
        </IonFabButton>
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
    </>
  );
};

const List = styled(IonList)`
  min-height: 100%;
  padding-bottom: 65px;
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.5);
`;

const SlidingAction = styled(IonItemOption)`
  width: 75px;
`;

const Note = styled.div`
  margin-bottom: 16px;
`;
