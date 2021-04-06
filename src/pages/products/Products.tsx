import React, { useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonList,
  IonButton,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { add } from "ionicons/icons";
import styled from "styled-components";
import { IProduct } from "../../classes/product/IProduct";
import { useProducts } from "../../hooks/productsHook";
import { useDispatch } from "react-redux";
import { retrieveProducts } from "../../redux/actions/productsActions";

export const Products: React.FC = () => {
  const dispatch = useDispatch();
  const { products } = useProducts();

  useEffect(() => {
    if (products.length === 0) {
      dispatch(retrieveProducts());
    }
  }, []);

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
            expand="block"
            shape="round"
            size="large"
            routerLink="/products/add-product"
          >
            <IonIcon slot="icon-only" icon={add} />
          </AddButton>
          {products.map((product: IProduct, i: number) => (
            <IonItem key={i} routerLink={`/products/edit-product/${product.id}`}>
              <IonLabel>{product.name}</IonLabel>
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
  margin: 12px;
`;
