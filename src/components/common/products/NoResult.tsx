import { IonContent, IonText } from "@ionic/react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

export const NoResult: React.FC = () => {
  const { t } = useTranslation();
  return (
    <IonContent>
      <Wrapper>
        <IonText color="medium">
          <p>{t("no.result")}</p>
        </IonText>
      </Wrapper>
    </IonContent>
  );
};

const Wrapper = styled.div`
  margin: 12px 24px;
  text-align: center;
`;
