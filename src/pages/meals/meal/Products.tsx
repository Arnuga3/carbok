import React, { useState } from "react";
import styled from "styled-components";
import {
  IonAlert,
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
import { IProduct } from "../../../classes/product/IProduct";
import { IMeal } from "../../../classes/meal/IMeal";
import { ProductsModal } from "./ProductsModal";
import { useDispatch } from "react-redux";
import { updateMeal } from "../../../redux/actions/mealsActions";
import { chatbubbleOutline, scaleOutline, trashOutline } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import CalculationService from "../../../services/CalculationService";
import { ProductListItem } from "../../../components/common/ProductListItem";
import { CircleBadge } from "../../../components/common/CircleBadge";

interface Props {
  meal: IMeal;
}
const MEALSPAGE = "meals-page";

const slidingItems: any = document.querySelector(".prod-slide");

export const Products: React.FC<Props> = ({ meal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const calculation = new CalculationService();

  const [openProductsModal, setOpenProductsModal] = useState(false);
  const [openPortionSizeAlert, setOpenPortionSizeAlert] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  const handlePortionSizeChange = (product: IProduct) => {
    setSelectedProduct(product);
    setOpenPortionSizeAlert(true);
  };

  const handlePortionSizeUpdate = (targetPortion: number) => {
    if (selectedProduct) {
      //FIXME const { carbs, sugars, portion } = selectedProduct.carbsData;
      const carbsUpdated = 0;
      // calculation.getPortionCarbs(
      //   carbs,
      //   portion,
      //   targetPortion
      // );
      const sugarsUpdated = 0;
      // calculation.getPortionSugars(
      //   carbs,
      //   sugars,
      //   portion,
      //   targetPortion
      // );
      const carbsDataUpdated = {
        ...selectedProduct.carbsData,
        portion: targetPortion,
        carbs: carbsUpdated,
        sugars: sugarsUpdated,
      };
      const mealUpdated = {
        ...meal,
        products: meal.products.map((product) =>
          product.id === selectedProduct.id
            ? { ...product, carbsData: carbsDataUpdated }
            : product
        ),
      };
      dispatch(updateMeal(mealUpdated));
    }
  };

  const handleMealProductDelete = () => {
    if (slidingItems) {
      slidingItems.closeOpened();
    }
    if (selectedProduct) {
      dispatch(
        updateMeal({
          ...meal,
          products: meal.products.filter((prod) => prod.id !== selectedProduct.id),
        })
      );
    }
  };

  const handleOnMealProductDelete = (product: IProduct) => {
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
                  <CircleBadge color={product.category.color} size={40}>
                    {t(product.category.nameKey).slice(0, 3)}
                  </CircleBadge>
                </IonAvatar>
              <ProductListItem product={product} mealProduct={true} />
            </IonItem>
            <IonItemOptions>
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
          color="primary"
          expand="block"
          shape="round"
          onClick={() => setOpenProductsModal(true)}
        >
          {t("page.meals.button.add.product")}
        </AddButton>
      </IonList>
      <ProductsModal
        meal={meal}
        open={openProductsModal}
        onClose={() => setOpenProductsModal(false)}
      />
      <IonAlert
        isOpen={openPortionSizeAlert}
        onDidDismiss={() => setOpenPortionSizeAlert(false)}
        header={`${t("portion.size")} (${
          selectedProduct ? t(selectedProduct?.units.shortNameKey) : ""
        })`}
        inputs={[
          {
            name: "portion",
            //FIXME value: selectedProduct?.carbsData.portion,
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
      <IonAlert
        isOpen={openDeleteAlert}
        onDidDismiss={() => setOpenDeleteAlert(false)}
        header={t("page.meals.delete.meal.product.alert.title")}
        subHeader={t("page.meals.delete.meal.product.alert.subtitle")}
        buttons={[
          { text: t("button.cancel"), role: "cancel" },
          {
            text: t("button.delete"),
            role: "destructive",
            handler: handleMealProductDelete,
          },
        ]}
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
