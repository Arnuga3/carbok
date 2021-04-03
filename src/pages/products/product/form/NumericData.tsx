import React, { useState } from "react";
import {
  IonButton,
  IonButtons,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
  IonContent,
  IonLabel,
  IonChip,
  IonCard,
  IonCardContent,
  IonInput,
  IonIcon,
} from "@ionic/react";
import { IProductDummy } from "../AddProduct";
import styled from "styled-components";
import { warningOutline } from "ionicons/icons";

export enum NumericInput {
  PORTION = "PORTION",
  CARBS = "CARBS",
  SUGARS = "SUGARS",
  DEFAULT_PORTION = "DEFAULT_PORTION",
}

interface Props {
  data: IProductDummy;
  portionValid: boolean;
  carbsValid: boolean;
  sugarsValid: boolean;
  onNumericDataChange: (type: NumericInput, value: string) => void;
}

export const NumericData: React.FC<Props> = ({
  data,
  portionValid,
  carbsValid,
  sugarsValid,
  onNumericDataChange,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const dataValid = portionValid && carbsValid && sugarsValid;

  return (
    <>
      <ChipWrapper>
        <IonChip color="secondary" outline>
          <IonLabel color="secondary">{`Portion: ${data.portion}${data.units}`}</IonLabel>
        </IonChip>
        <IonChip color="medium">
          <IonLabel color="medium">
            {`Default Portion: ${data.defaultPortion}${data.units}`}
          </IonLabel>
        </IonChip>
        <IonChip color="success" outline>
          <IonLabel color="success">{`Carbs: ${data.carbs}g`}</IonLabel>
        </IonChip>
        <IonChip color="danger" outline>
          <IonLabel color="danger">{`...of which Sugars: ${data.sugars}g`}</IonLabel>
        </IonChip>
      </ChipWrapper>
      <IonButton
        color={dataValid ? "secondary" : "danger"}
        shape="round"
        onClick={() => setOpenModal(true)}
      >
        {!dataValid && <IonIcon icon={warningOutline} />}
        Edit
      </IonButton>
      <IonModal isOpen={openModal}>
        <IonContent>
          <IonHeader slot="fixed">
            <IonToolbar>
              <IonTitle>Carbs per Portion</IonTitle>
              <IonButtons slot="end">
                <IonButton
                  onClick={() => setOpenModal(false)}
                  fill="solid"
                  shape="round"
                >
                  Close
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonCardStyled>
            <IonCardContent>
              <Row>
                <IonInputStyled
                  type="number"
                  inputmode="numeric"
                  enterkeyhint="done"
                  value={data.portion}
                  onIonChange={(e: any) =>
                    onNumericDataChange(NumericInput.PORTION, e.target.value)
                  }
                >
                  <IonChip
                    color={portionValid ? "primary" : "danger"}
                    outline={portionValid}
                  >
                    <IonLabel color={portionValid ? "primary" : "danger"}>
                      Portion
                    </IonLabel>
                  </IonChip>
                </IonInputStyled>
                {data.units}
              </Row>
              {!portionValid && <Error>Should be greater than 0</Error>}

              <Row>
                <IonInputStyled
                  type="number"
                  inputmode="numeric"
                  enterkeyhint="done"
                  value={data.carbs}
                  onIonChange={(e: any) =>
                    onNumericDataChange(NumericInput.CARBS, e.target.value)
                  }
                >
                  <IonChip
                    color={carbsValid ? "success" : "danger"}
                    outline={carbsValid}
                  >
                    <IonLabel color={carbsValid ? "success" : "danger"}>
                      Carbohydrates
                    </IonLabel>
                  </IonChip>
                </IonInputStyled>
                {data.units}
              </Row>
              {!carbsValid && (
                <Error>Should be smaller or equal to Portion</Error>
              )}

              <Row>
                <IonInputStyled
                  type="number"
                  inputmode="numeric"
                  enterkeyhint="done"
                  value={data.sugars}
                  onIonChange={(e: any) =>
                    onNumericDataChange(NumericInput.SUGARS, e.target.value)
                  }
                >
                  <IonChip color={"danger"} outline={sugarsValid}>
                    <IonLabel color={"danger"}>...of which Sugars</IonLabel>
                  </IonChip>
                </IonInputStyled>
                {data.units}
              </Row>
              {!sugarsValid && (
                <Error>Should be smaller or equal to Carbohydrates</Error>
              )}

              <Row>
                <IonInputStyled
                  type="number"
                  inputmode="numeric"
                  enterkeyhint="done"
                  value={data.defaultPortion}
                  onIonChange={(e: any) =>
                    onNumericDataChange(
                      NumericInput.DEFAULT_PORTION,
                      e.target.value
                    )
                  }
                >
                  <IonChip color={"medium"} outline>
                    <IonLabel color={"medium"}>Default Portion</IonLabel>
                  </IonChip>
                </IonInputStyled>
                {data.units}
              </Row>

              <OkButton
                expand="block"
                shape="round"
                onClick={() => setOpenModal(false)}
              >
                OK
              </OkButton>
            </IonCardContent>
          </IonCardStyled>
        </IonContent>
      </IonModal>
    </>
  );
};

const ChipWrapper = styled.div`
  margin: 12px 4px;
`;

const IonCardStyled = styled(IonCard)`
  margin-top: 65px;
`;

const IonInputStyled = styled(IonInput)`
  text-align: right;
  font-size: 2.5em;
  margin-right: 16px;
`;

const Error = styled.div`
  color: salmon;
  font-size: 0.7em;
  text-align: right;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const OkButton = styled(IonButton)`
  margin-top: 16px;
`;
