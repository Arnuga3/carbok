import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonPage,
} from "@ionic/react";
import { personOutline } from "ionicons/icons";

import CLogoIcon from "./../../resources/icons/logo.svg";
import CMealsIcon from "./../../resources/icons/meals.svg";
import CCalculatorIcon from "./../../resources/icons/calculator.svg";
import CProductsIcon from "./../../resources/icons/products.svg";
import CChartIcon from "./../../resources/icons/chart.svg";
import { CarbokIcon } from "../../components/styled/CarbokIcon";
import { HomeCard } from "./HomeCard";

const Home: React.FC = () => {
  const { t } = useTranslation();
  return (
    <IonPage>
      <IonContent>
        <Header>
          <Title>
            <CarbokIcon src={CLogoIcon} color="medium" size="54" />
          </Title>
          <IonButtons>
            <IonButton routerLink="/settings" style={{ marginLeft: 8 }}>
              <IonIcon icon={personOutline} slot="icon-only" color="medium" />
            </IonButton>
          </IonButtons>
        </Header>

        <HomeCard title={t("page.home.meals")}>
          <CarbokIcon src={CMealsIcon} size="48" color="primary" />
          <IonButton routerLink="/meals" color="primary" shape="round">
            {t("button.log.meal")}
          </IonButton>
        </HomeCard>

        <HomeCard title={t("page.home.calculator")}>
          <CarbokIcon src={CCalculatorIcon} size="46" color="primary" />
          <IonButton routerLink="/calculator" color="primary" shape="round">
            {t("button.calculate")}
          </IonButton>
        </HomeCard>

        <HomeCard title={t("page.home.overview")}>
          <CarbokIcon src={CChartIcon} size="48" color="primary" />
          <IonButton routerLink="/overview" color="primary" shape="round">
            {t("button.view.summary")}
          </IonButton>
        </HomeCard>

        <HomeCard title={t("page.home.products")}>
          <CarbokIcon src={CProductsIcon} size="52" color="primary" />
          <IonButton routerLink="/products" color="primary" shape="round">
            {t("button.manage")}
          </IonButton>
        </HomeCard>

        {/* <Card>
          <CardContent>{t("page.home.support")}</CardContent>
        </Card> */}
      </IonContent>
    </IonPage>
  );
};

export default React.memo(Home);

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 16px 16px 24px;
`;
