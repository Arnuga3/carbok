import React from "react";
import styled from "styled-components";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonText,
} from "@ionic/react";

interface Props {
  color?: string;
  title: string;
  link?: string;
  onClick?: () => void;
}

export const Option: React.FC<Props> = ({ color, title, link, onClick, children }) => {
  return (
    <Card color={color} routerLink={link} onClick={onClick}>
      <Header>
        <IonText color="primary"><Title>{title}</Title></IonText>
      </Header>
      <Content>{children}</Content>
    </Card>
  );
};

const Card = styled(IonCard)`
  width: 155px;
  height: 165px;
  margin: 8px 4px;
  box-shadow: 1px 3px 10px 1px rgba(0, 0, 0, 0.2);
  border-radius: 32px;
`;

const Title = styled.span`
  text-align: center;
  font-size: 1.3em;
`;

const Header = styled(IonCardHeader)`
  text-align: center;
  font-weight: bold;
`;

const Content = styled(IonCardContent)`
  text-align: center;
  margin-top: 16px;
`;
