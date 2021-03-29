import {
  IonIcon,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonRange,
} from "@ionic/react";
import React from "react";
import styled from "styled-components";

interface Props {
  dataValid?: any;
  errorMessage?: string;
  label: string;
  onChange: any;
  units?: string;
  min?: number;
  max?: number;
  value: number;
  icon?: string;
}

export const RangeSlider: React.FC<Props> = ({
  dataValid = true,
  errorMessage = '',
  label,
  onChange,
  units = "g",
  min = 0,
  max = 500,
  value,
  icon,
}) => {
  return (
    <IonItemGroup>
      <IonItemDivider>
        {icon && <IonIcon size="small" icon={icon} slot="start" />}
        <IonLabel>{label}</IonLabel>
      </IonItemDivider>
      <IonItem>
        <IonRange
          onIonChange={(e) => onChange(parseInt(e.detail.value.toString()))}
          min={min}
          max={max}
          value={value}
          color="primary"
        >
          <RightLabel slot="end">{`${value} (${units})`}</RightLabel>
        </IonRange>
      </IonItem>
      {!dataValid && <Error>{errorMessage}</Error>}
    </IonItemGroup>
  );
};

const RightLabel = styled(IonLabel)`
  width: 60px;
  text-align: right;
`;

const Error = styled.div`
  color: salmon;
  width: 100%;
  font-size: .7em;
  text-align: center;
`;