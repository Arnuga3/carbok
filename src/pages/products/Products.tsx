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
  IonText,
  IonSearchbar,
} from "@ionic/react";
import styled from "styled-components";
import { IProduct } from "../../classes/product/IProduct";
import { useProducts } from "../../hooks/productsHook";
import { useDispatch } from "react-redux";
import { retrieveProducts } from "../../redux/actions/productsActions";
import { useTranslation } from "react-i18next";

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

  const handleSearch = (e: any) => {
    setSearchResult(
      products.filter(
        (product) =>
          product.name.toLowerCase().indexOf(e.detail.value.toLowerCase()) > -1
      )
    );
  };

  return (
    <IonPage>
      <IonContentStyled>
        <IonHeader slot="fixed">
          <IonToolbar>
            <IonTitle>Products</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <AddButton
            size="large"
            expand="block"
            shape="round"
            routerLink="/products/add-product"
          >
            Add Product
          </AddButton>
          <Search animated onIonChange={handleSearch}></Search>
          {searchResult.map((product: IProduct, i: number) => (
            <IonItem
              detail
              key={i}
              routerLink={`/products/edit-product/${product.id}`}
            >
              <ListItemContent>
                <ProductTitle>{product.name}</ProductTitle>
                <IonText color="medium">
                  <small>Per</small>
                  <Label color="medium">{` ${product.carbsData.portion}${t(
                    product.units.shortNameKey
                  )} `}</Label>
                  <small>- Carbohydrates</small>
                  <Label color="success">{` ${product.carbsData.carbs}g `}</Label>
                  <small> ...of which Sugars</small>
                  <Label color="danger">{` ${product.carbsData.sugars}g`}</Label>
                </IonText>
              </ListItemContent>
            </IonItem>
          ))}
        </IonList>
      </IonContentStyled>
    </IonPage>
  );
};

const IonContentStyled = styled(IonContent)`
  --padding-top: 50px;
`;

const AddButton = styled(IonButton)`
  margin: 10px;
`;

const Search = styled(IonSearchbar)`
  --border-radius: 25px;
  width: 100%;
`;

const ListItemContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 0;
`;

const ProductTitle = styled.span`
  font-weight: bolder;
  padding: 2px 0;
`;

const Label = styled(IonText)`
  font-weight: bolder;
  font-size: 0.8em;
`;
