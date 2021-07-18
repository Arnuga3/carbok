import React from "react";
import styled from "styled-components";
import { IonCard, IonCardContent, IonText } from "@ionic/react";

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
      <CardContent>
        {children}
        <IonText color="tertiary">
          <p>{title}</p>
        </IonText>
      </CardContent>
    </Card>
  );
};

const Card = styled(IonCard)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 155px;
  height: 165px;
  margin: 8px 4px;
  box-shadow: 1px 3px 10px 1px rgba(0, 0, 0, 0.2);
  border-radius: 2px;
`;

const CardContent = styled(IonCardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    text-align: center;
    font-size: 1.2em;
    font-weight: bold;
    margin: 12px 0;
  }
`;
