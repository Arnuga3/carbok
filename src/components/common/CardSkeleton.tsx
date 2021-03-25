import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import styled from "styled-components";

interface Props {
  animated?: boolean;
  onClick?: any;
  children?: any;
}

export const CardSkeleton: React.FC<Props> = ({
  animated = false,
  onClick,
  children,
}) => {
  return (
    <IonCardStyled onClick={onClick}>
      <CardOverlay>{children}</CardOverlay>
      <IonCardHeader>
        <IonCardTitle>
          {animated ? (
            <SkeletonContentAnimated>&nbsp;</SkeletonContentAnimated>
          ) : (
            <SkeletonContent>&nbsp;</SkeletonContent>
          )}
        </IonCardTitle>
        <IonCardSubtitle>
          {animated ? (
            <SkeletonContentAnimated>&nbsp;</SkeletonContentAnimated>
          ) : (
            <SkeletonContent>&nbsp;</SkeletonContent>
          )}
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        {animated ? (
          <SkeletonContentAnimated style={{ height: "50px" }}>
            &nbsp;
          </SkeletonContentAnimated>
        ) : (
          <SkeletonContent style={{ height: "50px" }}>&nbsp;</SkeletonContent>
        )}
      </IonCardContent>
    </IonCardStyled>
  );
};

const color = "rgba(0,0,0,.03)";

const IonCardStyled = styled(IonCard)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 160px;

  @keyframes load {
    from {
      left: -150px;
    }
    to {
      left: 100%;
    }
  }
`;

const CardOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SkeletonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${color};
`;

const SkeletonContentAnimated = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${color};
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    display: block;
    position: absolute;
    left: -150px;
    top: 0;
    height: 100%;
    width: 150px;
    background: linear-gradient(
      to right,
      transparent 0%,
      ${color} 50%,
      transparent 100%
    );
    animation: load 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
`;
