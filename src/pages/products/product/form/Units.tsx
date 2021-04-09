import { useTranslation } from 'react-i18next';
import { IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";
import styled from "styled-components";
import { IUnits } from "../../../../classes/units/IUnits";

import { productUnits } from "../../../../resources/productUnits";

interface Props {
  units: IUnits;
  onUnitsChange: (event: any) => void;
}

export const Units: React.FC<Props> = ({ units, onUnitsChange }) => {
  const { t } = useTranslation();
  return (
    <IonSegmentStyled
      value={units.type}
      onIonChange={(e) => {
        const unitsSelected = productUnits.find(
          (u) => u.type === e.detail.value
        );
        onUnitsChange(unitsSelected);
      }}
    >
      <IonSegmentButton value={productUnits[1].type}>
        <IonLabel>{t(productUnits[1].nameKey)}</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value={productUnits[0].type}>
        <IonLabel>{t(productUnits[0].nameKey)}</IonLabel>
      </IonSegmentButton>
    </IonSegmentStyled>
  );
};

const IonSegmentStyled = styled(IonSegment)`
  width: 95%;
  margin: 10px auto;
`;
