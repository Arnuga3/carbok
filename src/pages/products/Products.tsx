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
  IonChip,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import styled from "styled-components";
import { IProduct } from "../../classes/product/IProduct";
import { useProducts } from "../../hooks/productsHook";
import { useDispatch } from "react-redux";
import { retrieveProducts } from "../../redux/actions/productsActions";
import { useTranslation } from "react-i18next";
import { scaleOutline } from "ionicons/icons";

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
            <IonTitle>{t("page.products.title")}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <AddButton
            size="large"
            expand="block"
            shape="round"
            routerLink="/products/add-product"
          >
            {t("page.products.button.add.product")}
          </AddButton>
          <Search animated onIonChange={handleSearch} placeholder={t("page.products.search.placeholder")}></Search>
          {searchResult.map((product: IProduct, i: number) => (
            <IonItem
              detail
              key={i}
              routerLink={`/products/edit-product/${product.id}`}
            >
              <ListItemContent>
                <ListItemTitle>{product.name}</ListItemTitle>
                <ListItemRow>
                  <ListItemChip color="secondary">
                    <IonIcon icon={scaleOutline} />
                    <ListItemLabel>{` ${product.carbsData.portion}${t(
                      product.units.shortNameKey
                    )} `}</ListItemLabel>
                  </ListItemChip>
                  <ListItemChip color="success">
                    <IonLabel color="success">
                      <ListItemLabel>{`${t("carbohydrates.short")} `}</ListItemLabel>
                      {product.carbsData.carbs}
                      <ListItemLabel>{t("units.grams.short")}</ListItemLabel>
                    </IonLabel>
                  </ListItemChip>
                  <ListItemChip color="danger">
                    <IonLabel color="danger">
                      <ListItemLabel>{`${t("sugars")} `}</ListItemLabel>
                      {product.carbsData.sugars}
                      <ListItemLabel>{t("units.grams.short")}</ListItemLabel>
                    </IonLabel>
                  </ListItemChip>
                </ListItemRow>
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
  padding-bottom: 12px;
`;

const ListItemContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 8px;
`;

const ListItemTitle = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
`;

const ListItemRow = styled.div`
  display: flex;
`;

const ListItemLabel = styled(IonText)`
  font-weight: bold;
  font-size: 0.8em;
`;

const ListItemChip = styled(IonChip)`
  padding: 4px 8px;
`;
