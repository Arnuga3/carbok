import React from "react";
import {
  IonHeader,
  IonContent,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
} from "@ionic/react";
import styled from "styled-components";

export const Product: React.FC = () => {
  return (
    <IonPage>
      <IonContentStyled>
        <IonHeader slot="fixed">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/meals" />
            </IonButtons>
            <IonTitle>Add Product</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContentStyled>
    </IonPage>
  );
};

const IonContentStyled = styled(IonContent)`
  --padding-top: 50px;
`;
