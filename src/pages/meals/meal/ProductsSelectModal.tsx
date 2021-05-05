import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  IonList,
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
import { retrieveProducts } from "../../../redux/actions/productsActions";
import { updateMeal } from "../../../redux/actions/mealsActions";
import CalculationService from "../../../services/CalculationService";

interface Props {
  meal: IMeal;
  open: boolean;
  onClose: any;
}

const defaultSelectedProducts: IProduct[] = [];

export const ProductsSelectModal: React.FC<Props> = ({ meal, open, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const c = new CalculationService();

  const { products } = useProducts();
  const [searchResult, setSearchResult] = useState(products);
  const [selectedProducts, setSelectedProducts] = useState(
    defaultSelectedProducts
  );

  useEffect(() => {
    if (products.length === 0) {
      dispatch(retrieveProducts());
    }
  }, []);

  useEffect(() => {
    if (products && products.length !== 0) {
      setSearchResult(products);
    }
  }, [products]);

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

  const handleSearch = (result: IProduct[]) => setSearchResult(result);

  const handleSelect = () => {
    const mealProducts: IMealProduct[] = selectedProducts.map((product) => {
      const mealProduct = new MealProduct(product);

      if (mealProduct.portionType === 'weight') {
        const { carbs, sugars } = mealProduct.carbsData.per100;
        const { portion } = mealProduct.mealProductCarbs.per100;
        return {
          ...mealProduct,
          mealProductCarbs: {
            ...mealProduct.mealProductCarbs,
            per100: c.getCarbsFromWeight(
              carbs,
              sugars,
              portion,
            ),
          }
        }
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

  return (
    <IonModal isOpen={open}>
      <IonHeader mode="ios" translucent>
        <HeaderContent>
          <ProductsSearch products={products} onSearchComplete={handleSearch} />
          <IonButton onClick={handleClose} color="primary" fill="clear">
            <IonIcon icon={close} slot="icon-only" />
          </IonButton>
        </HeaderContent>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {searchResult.map((product: IProduct, i: number) => (
            <IonItem key={i} onClick={() => toggleSelect(product)}>
              <IonIcon
                slot="start"
                color="primary"
                icon={
                  selectedProducts.find((prd) => prd.id === product.id)
                    ? checkmarkCircle
                    : ellipseOutline
                }
              />
              <ProductListItem product={product} />
            </IonItem>
          ))}
        </IonList>
      </IonContent>
      {selectedProducts.length > 0 && (
        <IonFooter slot="fixed">
          <IonToolbar>
            <SelectButton
              color="primary"
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
