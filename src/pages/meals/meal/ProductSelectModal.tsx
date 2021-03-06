import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  IonIcon,
  IonToolbar,
  IonButton,
  IonModal,
  IonFooter,
  IonButtons,
  IonContent,
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
import { useSearchHistory } from "../../../hooks/searchHistoryHook";
import { SearchHistoryList } from "../../../components/common/SearchHistoryList";
import _ from "lodash";

interface Props {
  meal: Meal;
  open: boolean;
  onClose: () => void;
}

interface State {
  products: Product[];
  productsSelected: Product[];
  searchText: string | null;
}

export const ProductSelectModal: React.FC<Props> = ({
  meal,
  open,
  onClose,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [searched, setSearched] = useSearchHistory();

  const [state, setState] = useState<State>({
    products: [],
    productsSelected: [],
    searchText: null,
  });
  const { products, productsSelected, searchText } = state;

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open]);

  const onSelect = () => {
    setSearched(
      _.uniq([
        ...productsSelected.map((product) => product.name),
        ...(searched ?? []),
      ]).slice(0, 10)
    );

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

  const search = async (searchText: string) => {
    const searchResults = await dataService.retrieveProducts(searchText);
    setState({
      ...state,
      products: searchResults,
      productsSelected: [],
      searchText,
    });
  };

  const reset = () =>
    setState({
      ...state,
      products: [],
      productsSelected: [],
      searchText: null,
    });

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
            <Search value={searchText} onSearch={search} onClear={reset} />
          </IonToolbar>
          <IonContent>
            {state.products.length > 0 && (
              <ProductsListSelectable
                products={products ?? []}
                productsSelected={productsSelected ?? []}
                onSelectionChange={(products: Product[]) =>
                  setState({ ...state, productsSelected: products })
                }
              />
            )}
            {state.products.length === 0 && searched && searched.length > 0 && (
              <SearchHistoryList
                items={searched}
                onClick={(text: string) => search(text)}
              />
            )}
            {state.products.length === 0 && !searched && <NoResult />}
          </IonContent>
          {productsSelected.length > 0 && (
            <IonFooter slot="fixed">
              <IonToolbar>
                <SelectButton
                  color="secondary"
                  onClick={onSelect}
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
