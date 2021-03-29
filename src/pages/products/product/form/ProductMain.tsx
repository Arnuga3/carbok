import React from "react";
import {
  IonInput,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import styled from "styled-components";
import { IProductCategory } from "../../../../interfaces/IProductCategory";

interface Props {
  nameValid: any;
  category: IProductCategory | null | undefined;
  units: string;
  onNameChange: any;
  onUnitsChange: any;
  onCategoryModalOpen: any;
}

export const ProductMain: React.FC<Props> = ({
  nameValid,
  category,
  units,
  onNameChange,
  onUnitsChange,
  onCategoryModalOpen,
}) => {
  return (
    <IonItemGroup>
      <IonItemDivider>
        <IonLabel>Product</IonLabel>
      </IonItemDivider>
      <IonItemStyled>
        <IonLabel color="medium">Name</IonLabel>
        <IonInput
          className="input-right-align"
          onIonInput={(e: any) => onNameChange(e.target.value)}
        ></IonInput>
      </IonItemStyled>
      {!nameValid && <Error>Required</Error>}
      <IonItemStyled onClick={onCategoryModalOpen} detail>
        <IonLabel color="medium">Category</IonLabel>
        <IonInput
          readonly
          className="input-right-align"
          value={category ? category?.type : ""}
        ></IonInput>
      </IonItemStyled>
      {!category && <Error>Required</Error>}
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
    </IonItemGroup>
  );
};

const IonItemStyled = styled(IonItem)`
  --padding-top: 6px;
  --padding-bottom: 6px;
`;

const IonSegmentStyled = styled(IonSegment)`
  width: 95%;
  margin: 10px auto;
`;

const Error = styled.div`
  color: salmon;
  width: 100%;
  font-size: .7em;
  text-align: center;
`;