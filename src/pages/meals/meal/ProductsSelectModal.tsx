import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
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
import { useProducts } from "../../../hooks/productsHook";
import {
  retrieveProducts,
  setSearchString,
} from "../../../redux/actions/products/actions";
import { updateMeal } from "../../../redux/actions/meals/actions";
import { Product } from "../../../classes/product/Product";
import { MealProduct } from "../../../classes/meal/MealProduct";
import { Meal } from "../../../classes/meal/Meal";
import { calcService } from "../../../services/CalculationService";
interface Props {
  meal: Meal;
  open: boolean;
  onClose: any;
}

const defaultSelectedProducts: Product[] = [];

export const ProductsSelectModal: React.FC<Props> = ({
  meal,
  open,
  onClose,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { products, searchString } = useProducts();

  const [selectedProducts, setSelectedProducts] = useState(
    defaultSelectedProducts
  );

  useEffect(() => {
    if (searchString) {
      dispatch(retrieveProducts(searchString));
    } else {
      dispatch(retrieveProducts());
    }
    return () => {
      dispatch(setSearchString(null));
    };
  }, [searchString]);

  const toggleSelect = (product: Product) => {
    const isSelected = selectedProducts.find((prd) => prd.id === product.id);
    let selectedProductsUpdated;
    if (isSelected) {
      selectedProductsUpdated = selectedProducts.filter(
        (prd: Product) => prd.id !== product.id
      );
    } else {
      selectedProductsUpdated = [...selectedProducts, product];
    }
    setSelectedProducts(selectedProductsUpdated);
  };

  const handleSelect = () => {
    const mealProducts: MealProduct[] = selectedProducts.map((product) => {
      const mealProduct = new MealProduct(product);

      if (mealProduct.portionType === "weight") {
        const { carbs, sugars } = mealProduct.carbsData.per100;
        const { portion } = mealProduct.mealProductCarbs.per100;
        return {
          ...mealProduct,
          mealProductCarbs: {
            ...mealProduct.mealProductCarbs,
            per100: calcService.getCarbsFromWeight(carbs, sugars, portion),
          },
        };
      }
      return mealProduct;
    });

    const mealUpdated = {
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

  const ItemRow = ({ index, style }: { index: number; style: any }) => (
    <div style={style}>
      {products && (
        <Item
          lines="none"
          key={index}
          onClick={() => toggleSelect(products[index])}
        >
          <IonIcon
            size="large"
            slot="start"
            color="primary"
            icon={
              selectedProducts.find((prd) => prd.id === products[index].id)
                ? checkmarkCircle
                : ellipseOutline
            }
          />
          <ProductListItem product={products[index]} />
        </Item>
      )}
    </div>
  );

  return (
    <IonModal isOpen={open}>
      <Header>
        <ProductsSearch />
        <IonButton onClick={handleClose} color="light" fill="clear">
          <IonIcon icon={close} slot="icon-only" />
        </IonButton>
      </Header>
      <IonContent>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              overscanCount={3}
              itemCount={products ? products.length : 0}
              itemSize={() => 70}
            >
              {ItemRow}
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

const Item = styled(IonItem)`
  --min-height: 70px;
`;

const Header = styled.div`
  height: 58px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  margin: 4px 4px 0 4px;
  background-color: var(--ion-color-primary);
`;

const SelectButton = styled(IonButton)`
  margin: 12px;
`;
