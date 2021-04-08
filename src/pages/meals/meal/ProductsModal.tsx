import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { checkmarkCircle, ellipseOutline, close } from "ionicons/icons";
import { IProduct } from "../../../classes/product/IProduct";
import { useProducts } from "../../../hooks/productsHook";
import {
  IonList,
  IonItem,
  IonIcon,
  IonText,
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonButton,
  IonModal,
} from "@ionic/react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { retrieveProducts } from "../../../redux/actions/productsActions";
import { ProductsSearch } from "../../../components/common/ProductsSearch";

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
      <IonContentStyled>
        <IonHeader slot="fixed">
          <IonToolbar>
            <IonTitle>{t("page.meals.add.product.modal.title")}</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={onClose}>
                <IonIcon icon={close}/>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <ProductsSearch products={products} onSearchComplete={handleSearch}/>
          {searchResult.map((product: IProduct, i: number) => (
            <IonItem key={i} onClick={() => toggleSelect(product)}>
              <IonIcon
                color="primary"
                icon={
                  selectedProducts.find((prd) => prd.id === product.id)
                    ? checkmarkCircle
                    : ellipseOutline
                }
              />
              <ListItemContent>
                <ListItemTitle>
                  {product.name}
                  <IonText color="secondary">
                    <small> &middot; {t(product.category.nameKey)}</small>
                  </IonText>
                </ListItemTitle>
                <ListItemRow>
                  <Label color="medium">
                    <small>
                      <b>{` ${product.carbsData.portion}${t(
                        product.units.shortNameKey
                      )} |`}</b>
                    </small>
                  </Label>
                  <Label color="medium">
                    <small>
                      {t("carbohydrates.short")}
                      <b>{` ${product.carbsData.carbs}${t(
                        "units.grams.short"
                      )} |`}</b>
                    </small>
                  </Label>
                  <Label color="medium">
                    <small>
                      {t("of.which.sugars")}
                      <b>{` ${product.carbsData.sugars}${t(
                        "units.grams.short"
                      )}`}</b>
                    </small>
                  </Label>
                </ListItemRow>
              </ListItemContent>
            </IonItem>
          ))}
        </IonList>
      </IonContentStyled>
    </IonModal>
  );
};

const IonContentStyled = styled(IonContent)`
  --padding-top: 50px;
`;

const ListItemContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 12px;
`;

const ListItemTitle = styled.div`
  font-weight: bold;
`;

const ListItemRow = styled.div`
  display: flex;
`;

const Label = styled(IonText)`
  margin: 0 4px;
`;
