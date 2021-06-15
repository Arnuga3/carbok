import { useTranslation } from 'react-i18next';
import { IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";
import styled from "styled-components";

import { getUnitKey, productUnits } from "../../../../resources/productUnits";
import { UnitsType } from '../../../../classes/units/UnitsType';

interface Props {
  units: UnitsType;
  onUnitsChange: (event: any) => void;
}

export const Units: React.FC<Props> = ({ units, onUnitsChange }) => {
  const { t } = useTranslation();
  return (
    <IonSegmentStyled
      color="tertiary"
      value={units}
      onIonChange={(e) => {
        const unitsSelected = productUnits.find(
          (u) => u === e.detail.value
        );
        onUnitsChange(unitsSelected);
      }}
    >
      <IonSegmentButton value={productUnits[1]}>
        <IonLabel>{t(getUnitKey(productUnits[1]))}</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value={productUnits[0]}>
        <IonLabel>{t(getUnitKey(productUnits[0]))}</IonLabel>
      </IonSegmentButton>
    </IonSegmentStyled>
  );
};

const IonSegmentStyled = styled(IonSegment)`
  width: 95%;
  margin: 10px auto;
  margin-bottom: 18px;
`;
