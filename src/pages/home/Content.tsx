import React from "react";
import styled from "styled-components";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";

interface Props {
  color?: string;
  title: string;
  link?: string;
  onClick?: () => void;
}

export const Content: React.FC<Props> = ({
  color,
  title,
  link,
  onClick,
  children,
}) => {
  return (
    <Card color={color} routerLink={link} onClick={onClick}>
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
      </IonCardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

const Card = styled(IonCard)`
  width: 100%;
  border-radius: 20px;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.2);
`;

const CardContent = styled(IonCardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
