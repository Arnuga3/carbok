import React, { useState } from "react";
import styled from "styled-components";
import {
  IonAlert,
  IonButton,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonList,
} from "@ionic/react";
import { IProduct } from "../../../classes/product/IProduct";
import { IMeal } from "../../../classes/meal/IMeal";
import { ProductsModal } from "./ProductsModal";
import { useDispatch } from "react-redux";
import { updateMeal } from "../../../redux/actions/mealsActions";
import { scaleOutline, trashOutline } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import CalculationService from "../../../services/CalculationService";
import { ProductListItem } from "../../../components/common/ProductListItem";

interface Props {
  meal: IMeal;
  products: IProduct[];
}

const slidingItems: any = document.querySelector(".prod-slide");

export const MealProducts: React.FC<Props> = ({ meal, products = [] }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const calculation = new CalculationService();

  const [openProductsModal, setOpenProductsModal] = useState(false);
  const [openPortionSizeAlert, setOpenPortionSizeAlert] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  const handlePortionSizeChange = (product: IProduct) => {
    setSelectedProduct(product);
    setOpenPortionSizeAlert(true);
  };

  const handlePortionSizeUpdate = (targetPortion: number) => {
    if (selectedProduct) {
      const { carbs, sugars, portion } = selectedProduct.carbsData;
      const carbsUpdated = calculation.getPortionCarbs(
        carbs,
        portion,
        targetPortion
      );
      const sugarsUpdated = calculation.getPortionSugars(
        carbs,
        sugars,
        portion,
        targetPortion
      );
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

  const handleMealProductDelete = (product: IProduct) => {
    if (slidingItems) {
      slidingItems.closeOpened();
    }
    dispatch(
      updateMeal({
        ...meal,
        products: meal.products.filter((prod) => prod.id !== product.id),
      })
    );
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
        <AddButton
          size="large"
          expand="block"
          shape="round"
          onClick={() => setOpenProductsModal(true)}
        >
          {t("page.meals.button.add.product")}
        </AddButton>
        {products.map((product, i) => (
          <IonItemSliding
            key={i}
            id={product.name + i}
            onClick={() => toggleActionsSlide(product.name + i)}
          >
            <IonItem detail>
              <ProductListItem product={product} />
            </IonItem>
            <IonItemOptions>
              <SlidingAction
                color="secondary"
                onClick={() => handlePortionSizeChange(product)}
              >
                <IonIcon icon={scaleOutline} />
              </SlidingAction>
              <SlidingAction
                color="danger"
                onClick={() => handleMealProductDelete(product)}
              >
                <IonIcon icon={trashOutline} />
              </SlidingAction>
            </IonItemOptions>
          </IonItemSliding>
        ))}
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
            value: selectedProduct?.carbsData.portion,
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
    </>
  );
};

const AddButton = styled(IonButton)`
  margin: 12px;
`;

const SlidingAction = styled(IonItemOption)`
  width: 75px;
`;
