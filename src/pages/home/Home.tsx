import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonPage,
  IonText,
} from "@ionic/react";
import { Option } from "./Option";
import { person } from "ionicons/icons";
import { CalculatorModal } from "../../components/common/CalculatorModal";

import CLogoIcon from "./../../resources/icons/logo.svg";
import CMealsIcon from "./../../resources/icons/meals.svg";
import CCalculatorIcon from "./../../resources/icons/calculator.svg";
import CProductsIcon from "./../../resources/icons/products.svg";
import CChartIcon from "./../../resources/icons/chart.svg";
import { CarbokIcon } from "../../components/styled/CarbokIcon";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [openCalculatorModal, setOpenCalculatorModal] = useState(false);
  return (
    <IonPage>
      <IonContent color="primary">
        <Toolbar>
          <Title>
            <CarbokIcon src={CLogoIcon} color="white" size="56" />
          </Title>
          <IonText color="primary">
            <b>{t("page.home.title")}</b>
          </IonText>
          <IonButtons>
            <IonButton routerLink="/settings" style={{ marginLeft: 8 }}>
              <IonIcon icon={person} slot="icon-only" color="white" />
            </IonButton>
          </IonButtons>
        </Toolbar>
        <Fancy />
        <OptionsContainer>
          <Option title={t("page.home.overview")} link="/overview">
            <CarbokIcon src={CChartIcon} size="48" />
          </Option>
          <Option title={t("page.home.meals")} link="/meals">
            <CarbokIcon src={CMealsIcon} size="48" />
          </Option>
          <Option title={t("page.home.products")} link="/products">
            <CarbokIcon src={CProductsIcon} size="60" />
          </Option>
          <Option
            title={t("page.home.calculator")}
            onClick={() => setOpenCalculatorModal(true)}
          >
            <CarbokIcon src={CCalculatorIcon} size="48" />
          </Option>
          <Option title={t("page.home.support")} />
        </OptionsContainer>
        <CalculatorModal
          open={openCalculatorModal}
          onClose={() => setOpenCalculatorModal(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default React.memo(Home);

const Title = styled.div`
  display: flex;
  align-items: flex-end;
  margin-right: 12px;
`;

const Fancy = styled.div`
  height: 200px;
  border-bottom-right-radius: 100px;
  margin-top: -50px;
  background-color: var(--ion-color-secondary);
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 16px 12px 24px;
  background-color: var(--ion-color-secondary);
`;

const OptionsContainer = styled.div`
  margin-top: -150px;
  padding: 24px 12px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;