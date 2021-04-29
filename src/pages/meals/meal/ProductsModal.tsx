import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { checkmarkCircle, ellipseOutline, close } from "ionicons/icons";
import { IProduct } from "../../../classes/product/IProduct";
import { useProducts } from "../../../hooks/productsHook";
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
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { retrieveProducts } from "../../../redux/actions/productsActions";
import { ProductsSearch } from "../../../components/common/ProductsSearch";
import { ProductListItem } from "../../../components/common/ProductListItem";
import { IMeal } from "../../../classes/meal/IMeal";
import { updateMeal } from "../../../redux/actions/mealsActions";
import CalculationService from "../../../services/CalculationService";
import { uuidv4 } from "../../../utils/helper";

interface Props {
  meal: IMeal;
  open: boolean;
  onClose: any;
}

const defaultSelectedProducts: IProduct[] = [];

export const ProductsModal: React.FC<Props> = ({ meal, open, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const calculation = new CalculationService();

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
    const mealProducts = selectedProducts.map((product) => ({
      ...product,
      id: uuidv4(), // Create a new id as this is a copy of the existing product, not a reference
      carbsData: calculation.calculateTargetCarbsData(product.carbsData),
    }));
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
