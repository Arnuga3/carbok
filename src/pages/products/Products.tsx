import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonButton,
  IonItem,
} from "@ionic/react";
import styled from "styled-components";
import { IProduct } from "../../classes/product/IProduct";
import { useProducts } from "../../hooks/productsHook";
import { useDispatch } from "react-redux";
import { retrieveProducts } from "../../redux/actions/productsActions";
import { useTranslation } from "react-i18next";
import { ProductsSearch } from "../../components/common/ProductsSearch";
import { ProductListItem } from "../../components/common/ProductListItem";

export const Products: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { products } = useProducts();

  const [searchResult, setSearchResult] = useState(products);

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

  const handleSearch = (result: IProduct[]) => setSearchResult(result);

  return (
    <IonPage>
      <IonHeader slot="fixed">
        <IonToolbar>
          <IonTitle>{t("page.products.title")}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <AddButton
            size="large"
            expand="block"
            shape="round"
            routerLink="/products/add-product"
          >
            {t("page.products.button.add.product")}
          </AddButton>
          <ProductsSearch products={products} onSearchComplete={handleSearch} />
          {searchResult.map((product: IProduct, i: number) => (
            <IonItem
              detail
              key={i}
              routerLink={`/products/edit-product/${product.id}`}
            >
              <ProductListItem product={product} />
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

const AddButton = styled(IonButton)`
  margin: 10px;
`;
