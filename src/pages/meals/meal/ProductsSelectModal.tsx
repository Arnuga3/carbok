import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  IonIcon,
  IonToolbar,
  IonContent,
  IonButton,
  IonModal,
  IonFooter,
  IonButtons,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { updateMeal } from "../../../redux/actions/meals/actions";
import { Product } from "../../../classes/product/Product";
import { MealProduct } from "../../../classes/meal/MealProduct";
import { Meal } from "../../../classes/meal/Meal";
import { calcService } from "../../../services/CalculationService";
import { ProductsListSelectable } from "../../../components/common/products/productsListSelectable/ProductsListSelectable";
import { dataService } from "../../../services/DataService";
import { Search } from "../../../components/common/Search";
import { NoResult } from "../../../components/common/products/NoResult";

interface Props {
  meal: Meal;
  open: boolean;
  onClose: () => void;
}

export const ProductsSelectModal: React.FC<Props> = ({
  meal,
  open,
  onClose,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [state, setState] = useState<{
    products: Product[];
    productsSelected: Product[];
  }>({
    products: [],
    productsSelected: [],
  });

  const { products, productsSelected } = state;

  useEffect(() => {
    setState({ products: [], productsSelected: [] });
  }, [open]);

  useEffect(() => {
    document.addEventListener("ionBackButton", () => {
      onClose();
    });
    return () => {
      document.removeEventListener("ionBackButton", () => {
        onClose();
      });
    };
  }, []);

  const handleSearch = async (searchTerm: string) => {
    const productsFound = await dataService.retrieveProducts(searchTerm);
    setState({ ...state, products: productsFound, productsSelected: [] });
  };

  const handleSelect = () => {
    const mealProducts: MealProduct[] = productsSelected.map((product) => {
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
    onClose();
  };
  return (
    <IonModal isOpen={open} onDidDismiss={onClose}>
      {open && (
        <>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton
                color="medium"
                fill="clear"
                expand="block"
                shape="round"
                onClick={onClose}
              >
                <IonIcon icon={arrowBack} slot="icon-only" />
              </IonButton>
            </IonButtons>
            <Search
              onSearchChange={handleSearch}
              onClear={() => setState({ products: [], productsSelected: [] })}
            />
          </IonToolbar>
          {state.products.length > 0 ? (
            <ProductsListSelectable
              products={products ?? []}
              productsSelected={productsSelected ?? []}
              onSelectionChange={(products: Product[]) =>
                setState({ ...state, productsSelected: products })
              }
            />
          ) : (
            <NoResult />
          )}
          {productsSelected.length > 0 && (
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
        </>
      )}
    </IonModal>
  );
};

const SelectButton = styled(IonButton)`
  margin: 12px;
`;
