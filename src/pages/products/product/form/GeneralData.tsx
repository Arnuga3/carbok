import React from "react";
import {
  IonInput,
  IonItem,
  IonLabel,
  IonChip,
  IonButton,
  IonIcon,
} from "@ionic/react";
import styled from "styled-components";
import { IProductCategory } from "../../../../interfaces/IProductCategory";
import { pencil, warningOutline } from "ionicons/icons";

interface Props {
  categoryValid: boolean;
  category: IProductCategory | null | undefined;
  onNameChange: (name: string) => void;
  onCategoryModalOpen: any;
}

export const GeneralData: React.FC<Props> = ({
  categoryValid,
  category,
  onNameChange,
  onCategoryModalOpen,
}) => {
  return (
    <>
      <IonItem>
        <IonInput
          onIonInput={(e: any) => onNameChange(e.target.value)}
        ></IonInput>
      </IonItem>
      <Row>
        {category && category.type ? (
          <>
            <IonChip color="primary" outline>
              <IonLabel color="primary">{category.type}</IonLabel>
            </IonChip>
            <IonChip color="medium" onClick={onCategoryModalOpen}>
              <IonLabel></IonLabel>
              <IonIcon color="medium" icon={pencil} />
              <IonLabel></IonLabel>
            </IonChip>
          </>
        ) : (
          <IonButton
            color={categoryValid ? "secondary" : "danger"}
            shape="round"
            onClick={onCategoryModalOpen}
          >
            {!categoryValid && <IonIcon icon={warningOutline} />}
            Category
          </IonButton>
        )}
      </Row>
    </>
  );
};

const Row = styled.div`
  margin: 18px 0;
`;
