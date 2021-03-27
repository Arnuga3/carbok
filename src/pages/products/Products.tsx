import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonList,
  IonButton,
} from "@ionic/react";
import { add } from "ionicons/icons";
import styled from "styled-components";

export const Products: React.FC = () => {
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
            expand='block'
            shape='round'
            routerLink='/products/add-product'
          >
            <IonIcon slot='icon-only' icon={add} />
          </AddButton>
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
