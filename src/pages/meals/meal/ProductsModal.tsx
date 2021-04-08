import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { checkmarkCircle, ellipseOutline, close } from "ionicons/icons";
import { IProduct } from "../../../classes/product/IProduct";
import { useProducts } from "../../../hooks/productsHook";
import {
  IonList,
  IonItem,
  IonIcon,
  IonButtons,
  IonHeader,
  IonTitle,
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

interface Props {
  open: boolean;
  onClose: any;
  onSelect: any;
}

const defaultSelectedProducts: IProduct[] = [];

export const ProductsModal: React.FC<Props> = ({ open, onClose, onSelect }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
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

  return (
    <IonModal isOpen={open}>
      <IonHeader slot="fixed">
        <IonToolbar>
          <ProductsSearch products={products} onSearchComplete={handleSearch} />
          <IonButtons slot="end">
            <IonButton onClick={onClose}>
              <IonIcon icon={close} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {searchResult.map((product: IProduct, i: number) => (
            <IonItem key={i} onClick={() => toggleSelect(product)}>
              <IonIcon
                color="medium"
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
            <SelectButton onClick={onClose} expand="block" shape="round">
              {t("button.select")}
            </SelectButton>
          </IonToolbar>
        </IonFooter>
      )}
    </IonModal>
  );
};

const SelectButton = styled(IonButton)`
  margin: 0 12px;
`;
