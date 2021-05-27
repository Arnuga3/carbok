import React, { createRef, RefObject, useEffect, useState } from "react";
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  IonItem,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButton,
  IonModal,
  IonFooter,
} from "@ionic/react";
import { checkmarkCircle, ellipseOutline, close } from "ionicons/icons";
import { ProductsSearch } from "../../../components/common/ProductsSearch";
import { ProductListItem } from "../../../components/common/ProductListItem";
import { IMeal } from "../../../classes/meal/IMeal";
import { IProduct } from "../../../classes/product/IProduct";
import { IMealProduct } from "../../../classes/meal/IMealProduct";
import { MealProduct } from "../../../classes/meal/MealProduct";
import { useProducts } from "../../../hooks/productsHook";
import { retrieveProducts } from "../../../redux/actions/products/actions";
import { updateMeal } from "../../../redux/actions/meals/actions";
import CalculationService from "../../../services/CalculationService";

interface Props {
  meal: IMeal;
  open: boolean;
  onClose: any;
}

const defaultSelectedProducts: IProduct[] = [];

export const ProductsSelectModal: React.FC<Props> = ({
  meal,
  open,
  onClose,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const c = new CalculationService();

  const { products, searchString } = useProducts();

  const [selectedProducts, setSelectedProducts] = useState(
    defaultSelectedProducts
  );

  useEffect(() => {
    dispatch(retrieveProducts(searchString));
  }, [searchString]);

  const toggleSelect = (product: IProduct) => {
    const isSelected = selectedProducts.find((prd) => prd.id === product.id);
    let selectedProductsUpdated;
    if (isSelected) {
      selectedProductsUpdated = selectedProducts.filter(
        (prd: IProduct) => prd.id !== product.id
      );
    } else {
      selectedProductsUpdated = [...selectedProducts, product];
    }
    setSelectedProducts(selectedProductsUpdated);
  };

  const handleSelect = () => {
    const mealProducts: IMealProduct[] = selectedProducts.map((product) => {
      const mealProduct = new MealProduct(product);

      if (mealProduct.portionType === "weight") {
        const { carbs, sugars } = mealProduct.carbsData.per100;
        const { portion } = mealProduct.mealProductCarbs.per100;
        return {
          ...mealProduct,
          mealProductCarbs: {
            ...mealProduct.mealProductCarbs,
            per100: c.getCarbsFromWeight(carbs, sugars, portion),
          },
        };
      }
      return mealProduct;
    });

    const mealUpdated: IMeal = {
      ...meal,
      products: [...meal.products, ...mealProducts],
    };

    dispatch(updateMeal(mealUpdated));
    handleClose();
  };

  const handleClose = () => {
    setSelectedProducts(defaultSelectedProducts);
    onClose();
  };

  const Row = ({ index, style }: { index: number; style: any }) => (
    <div style={style}>
      <IonItem
        lines="none"
        key={index}
        onClick={() => toggleSelect(products[index])}
      >
        <IonIcon
          slot="start"
          color="primary"
          icon={
            selectedProducts.find((prd) => prd.id === products[index].id)
              ? checkmarkCircle
              : ellipseOutline
          }
        />
        <ProductListItem product={products[index]} />
      </IonItem>
    </div>
  );

  return (
    <IonModal isOpen={open}>
      <IonHeader mode="ios" translucent>
        <HeaderContent>
          <ProductsSearch />
          <IonButton onClick={handleClose} color="primary" fill="clear">
            <IonIcon icon={close} slot="icon-only" />
          </IonButton>
        </HeaderContent>
      </IonHeader>
      <IonContent fullscreen>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              itemCount={products.length}
              itemSize={() => 75}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      </IonContent>
      {selectedProducts.length > 0 && (
        <IonFooter slot="fixed">
          <IonToolbar>
            <SelectButton
              color="tertiary"
              onClick={handleSelect}
              expand="block"
              shape="round"
            >
              {t("button.add.selected")}
            </SelectButton>
          </IonToolbar>
        </IonFooter>
      )}
    </IonModal>
  );
};

const HeaderContent = styled.div`
  display: flex;
  padding: 0 8px;
`;

const SelectButton = styled(IonButton)`
  margin: 12px;
`;
