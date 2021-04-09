import React, { useState } from "react";
import { useTranslation } from "react-i18next";
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
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/react";
import { close } from "ionicons/icons";
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

export const CarbsData: React.FC<Props> = ({
  data,
  portionValid,
  carbsValid,
  sugarsValid,
  onNumericDataChange,
}) => {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const dataValid = portionValid && carbsValid && sugarsValid;

  return (
    <>
      <IonGrid>
        <IonRowStyled>
          <IonColLeft>
            <div>{t("per.portion")}</div>
          </IonColLeft>
          <IonColRight>
            <div>{`${data.portion}${t(data.units.shortNameKey)}`}</div>
          </IonColRight>
        </IonRowStyled>
        <IonRowStyled>
          <IonColLeft>
            <div>{t("carbohydrates")}</div>
          </IonColLeft>
          <IonColRight>
            <div>{`${data.carbs}${t("units.grams.short")}`}</div>
          </IonColRight>
        </IonRowStyled>
        <IonRowStyled>
          <IonColLeft>
            <div>{t("of.which.sugars")}</div>
          </IonColLeft>
          <IonColRight>
            <div>{`${data.sugars}${t("units.grams.short")}`}</div>
          </IonColRight>
        </IonRowStyled>
        <IonRowStyled>
          <IonColLeft>
            <div>{t("portion.default")}</div>
          </IonColLeft>
          <IonColRight>
            <div>{`${data.defaultPortion}${t(data.units.shortNameKey)}`}</div>
          </IonColRight>
        </IonRowStyled>
      </IonGrid>
      <IonButton
        color={dataValid ? "secondary" : "danger"}
        shape="round"
        onClick={() => setOpenModal(true)}
      >
        {!dataValid && <IonIcon icon={warningOutline} />}
        {t("button.edit")}
      </IonButton>
      <IonModal isOpen={openModal}>
        <IonHeader slot="fixed">
          <IonToolbar>
            <IonTitle>
              {t("page.products.form.portion.and.carbohydrates")}
            </IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setOpenModal(false)}>
                <IonIcon icon={close} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonCard>
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
                {t(data.units.shortNameKey)}
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
                {t(data.units.shortNameKey)}
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
                {t(data.units.shortNameKey)}
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
                {t(data.units.shortNameKey)}
              </Row>

              <OkButton
                expand="block"
                shape="round"
                onClick={() => setOpenModal(false)}
              >
                OK
              </OkButton>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonModal>
    </>
  );
};

const IonRowStyled = styled(IonRow)`
  border-bottom: 1px solid var(--ion-color-medium);
`;

const IonColLeft = styled(IonCol)`
  font-size: 0.9em;
`;

const IonColRight = styled(IonCol)`
  text-align: right;
  font-weight: bold;
  font-size: 0.9em;
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
