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
  IonButtons,
  IonIcon,
  IonListHeader,
  IonText,
} from "@ionic/react";
import styled from "styled-components";
import { IProduct } from "../../classes/product/IProduct";
import { useProducts } from "../../hooks/productsHook";
import { useDispatch } from "react-redux";
import { retrieveProducts } from "../../redux/actions/productsActions";
import { useTranslation } from "react-i18next";
import { ProductsSearch } from "../../components/common/ProductsSearch";
import { ProductListItem } from "../../components/common/ProductListItem";
import { add } from "ionicons/icons";

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
      <IonHeaderStyled slot="fixed">
        <IonToolbar>
          <IonButtons>
            <ProductsSearch
              products={products}
              onSearchComplete={handleSearch}
            />
            <AddButton
              color="primary"
              fill="solid"
              shape="round"
              slot="icon-only"
              routerLink="/products/add-product"
            >
              <IonIcon icon={add} />
            </AddButton>
          </IonButtons>
        </IonToolbar>
      </IonHeaderStyled>
      <IonContent>
        <IonList>
          <IonListHeader>
            <IonText>
              <p>#Group by Categories</p>
            </IonText>
          </IonListHeader>
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

const IonHeaderStyled = styled(IonHeader)`
  padding: 0 8px;
`;

const AddButton = styled(IonButton)`
  padding-left: 4px;
`;
