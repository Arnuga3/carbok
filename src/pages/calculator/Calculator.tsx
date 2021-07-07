import React, { useCallback, useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonInput,
  IonList,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { focusElement } from "../../utils/eventHelpers";
import { RoundedContent } from "../../components/styled/RoundedContent";
import { RoundedContentHeader } from "../../components/styled/RoundedContentHeader";

const defaultData = {
  portion: 100,
  carbs: 0,
  targetPortion: 0,
};

export const Calculator: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState(defaultData);
  const { portion, carbs, targetPortion } = data;

  const portionValid = useCallback(() => {
    return data.portion > 0;
  }, [data.portion]);

  const carbsValid = useCallback(() => {
    return data.carbs >= 0 && data.carbs <= data.portion;
  }, [data.carbs, data.portion]);

  const result = () => {
    if (carbs > 0 && portion > 0 && targetPortion > 0) {
      return ((carbs / portion) * targetPortion).toFixed(2);
    } else return 0;
  };

  return (
    <IonPage>
      <RoundedContent color="primary">
        <RoundedContentHeader>
          <Result color="white">
            <h1>{result()}</h1>
          </Result>
          <Label color="white">
            <small>{t("page.products.caluclator.modal.result.title")}</small>
          </Label>
        </RoundedContentHeader>
        <List>
          <Card>
            <IonCardContent>
              <IonGrid>
                <IonRow>
                  <IonColLeft>
                    <div>{t("per")}</div>
                  </IonColLeft>
                  <IonColRight>
                    <IonInputStyled
                      type="number"
                      inputmode="numeric"
                      enterkeyhint="done"
                      value={data.portion}
                      onIonChange={(e: any) =>
                        setData({ ...data, portion: e.target.value })
                      }
                      onFocus={focusElement}
                    ></IonInputStyled>
                    <Units>{`${t("units.milliliters.short")}/ ${t(
                      "units.grams.short"
                    )}`}</Units>
                  </IonColRight>
                </IonRow>
                {!portionValid() && (
                  <Error>{t("page.products.portion.error")}</Error>
                )}
                <IonRow>
                  <IonColLeft>
                    <div>{t("carbohydrates")}</div>
                  </IonColLeft>
                  <IonColRight>
                    <IonInputStyled
                      type="number"
                      inputmode="numeric"
                      enterkeyhint="done"
                      value={data.carbs}
                      onIonChange={(e: any) =>
                        setData({ ...data, carbs: e.target.value })
                      }
                      onFocus={focusElement}
                    ></IonInputStyled>
                    <Units>{t("units.grams.short")}</Units>
                  </IonColRight>
                </IonRow>
                {!carbsValid() && (
                  <Error>{t("page.products.carbs.error")}</Error>
                )}
                <IonRow>
                  <IonColLeft>
                    <div>{t("portion.size")}</div>
                  </IonColLeft>
                  <IonColRight>
                    <IonInputStyled
                      type="number"
                      inputmode="numeric"
                      enterkeyhint="done"
                      value={data.targetPortion}
                      onIonChange={(e: any) =>
                        setData({ ...data, targetPortion: e.target.value })
                      }
                      onFocus={focusElement}
                    ></IonInputStyled>
                    <Units>{t("units.grams.short")}</Units>
                  </IonColRight>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </Card>
          <Button
            color="secondary"
            expand="block"
            shape="round"
            onClick={() => setData(defaultData)}
          >
            {t("button.reset")}
          </Button>
        </List>
      </RoundedContent>
    </IonPage>
  );
};

const List = styled(IonList)`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.5);
`;

const Label = styled(IonText)`
  text-align: center;
  padding-bottom: 8px;
`;

const Result = styled(IonText)`
  z-index: 100;
  h1 {
    font-size: 4em;
    font-weight: bold;
  }
`;

const Card = styled(IonCard)`
  box-shadow: 0 0;
`;

const IonColLeft = styled(IonCol)`
  display: flex;
  align-items: center;
  font-size: 0.9em;
`;

const IonColRight = styled(IonCol)`
  display: flex;
  align-items: center;
  padding: 0;
  font-weight: bold;
  font-size: 0.9em;
`;

const IonInputStyled = styled(IonInput)`
  text-align: right;
  font-size: 1.2em;
  margin: 4px;
  border-radius: 8px;
  --background: var(--ion-color-light);
  --padding-end: 8px;
`;

const Units = styled.span`
  width: 40px;
  text-align: right;
`;

const Error = styled.div`
  color: salmon;
  font-size: 0.7em;
  text-align: right;
`;

const Button = styled(IonButton)`
  margin: 16px 12px;
`;
