import React from "react";
import styled from "styled-components";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";

interface Props {
  title: string;
}

export const HomeCard: React.FC<Props> = ({ title, children }) => {
  return (
    <Card color="tertiary">
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
      </IonCardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

const Card = styled(IonCard)`
  border-radius: 24px;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.1);
  padding: 12px 0 8px 8px;
  margin-top: 16px;
  background-image: linear-gradient(60deg, #abecd6 0%, #fbed96 100%);
`;

const CardContent = styled(IonCardContent)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
