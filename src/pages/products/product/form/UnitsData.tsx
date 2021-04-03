import React from "react";
import {
  IonLabel,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import styled from "styled-components";

interface Props {
  units: string;
  onUnitsChange: (event: any) => void;
}

export const UnitsData: React.FC<Props> = ({ units, onUnitsChange }) => {
  return (
    <IonSegmentStyled
      value={units}
      onIonChange={(e) => onUnitsChange(e.detail.value)}
    >
      <IonSegmentButton value="ml">
        <IonLabel>ml</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="g">
        <IonLabel>g</IonLabel>
      </IonSegmentButton>
    </IonSegmentStyled>
  );
};

const IonSegmentStyled = styled(IonSegment)`
  width: 95%;
  margin: 10px auto;
`;
