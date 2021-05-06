import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  IonAvatar,
  IonButton,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonList,
  IonText,
} from "@ionic/react";
import {
  chatbubbleOutline,
  layersOutline,
  scaleOutline,
  trashOutline,
} from "ionicons/icons";
import { IMeal } from "../../../classes/meal/IMeal";
import { CircleBadge } from "../../../components/common/CircleBadge";
import { MealProductListItem } from "../../../components/common/MealProductListItem";
import { ProductsSelectModal } from "./ProductsSelectModal";
import { IMealProduct } from "../../../classes/meal/IMealProduct";
import { ChangePortionWeightAlert } from "./productAlerts/ChangePortionWeightAlert";
import { ChangeQuantityAlert } from "./productAlerts/ChangeQuantityAlert";
import { DeleteAlert } from "./productAlerts/DeleteAlert";
import { categoryColours } from "../../../resources/config";
import { getCatKey } from "../../../resources/productCategories";

interface Props {
  meal: IMeal;
}
const MEALSPAGE = "meals-page";

export const Products: React.FC<Props> = ({ meal }) => {
  const { t } = useTranslation();

  const [openProductsModal, setOpenProductsModal] = useState(false);
  const [openPortionSizeAlert, setOpenPortionSizeAlert] = useState(false);
  const [openPortionQuantityAlert, setOpenPortionQuantityAlert] = useState(
    false
  );
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IMealProduct | null>(
    null
  );

  const handlePortionSizeChange = (product: IMealProduct) => {
    setSelectedProduct(product);
    setOpenPortionSizeAlert(true);
  };

  const handlePortionQunatityChange = (product: IMealProduct) => {
    setSelectedProduct(product);
    setOpenPortionQuantityAlert(true);
  };

  const handleOnMealProductDelete = (product: IMealProduct) => {
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
      <IonList>
        {meal.products.map((product, i) => (
          <IonItemSliding
            key={i}
            id={MEALSPAGE + i}
            onClick={() => toggleActionsSlide(MEALSPAGE + i)}
          >
            <IonItem detail>
              <IonAvatar slot="start">
                <CircleBadge color={categoryColours[product.category.type]} size={40}>
                  {t(getCatKey(product.category.type)).slice(0, 3)}
                </CircleBadge>
              </IonAvatar>
              <MealProductListItem product={product} />
            </IonItem>
            <IonItemOptions>
              {product.portionType === "quantity" && (
                <SlidingAction
                  color="secondary"
                  onClick={() => handlePortionQunatityChange(product)}
                >
                  <IonIcon icon={layersOutline} slot="icon-only" />
                </SlidingAction>
              )}
              <SlidingAction
                color="tertiary"
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
        {meal.note && (
          <Note>
            <IonItem lines="none">
              <IonIcon icon={chatbubbleOutline} slot="start" />
              <IonText color="medium">{meal.note}</IonText>
            </IonItem>
          </Note>
        )}
        <AddButton
          color="tertiary"
          expand="block"
          shape="round"
          onClick={() => setOpenProductsModal(true)}
        >
          {t("page.meals.button.add.product")}
        </AddButton>
      </IonList>
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

const AddButton = styled(IonButton)`
  margin: 12px;
`;

const SlidingAction = styled(IonItemOption)`
  width: 75px;
`;

const Note = styled.div`
  padding: 12px 8px 0 8px;
`;
