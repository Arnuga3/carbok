import React, { useState } from "react";
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
import { CalculatorModal } from "../../components/common/CalculatorModal";

import CLogoIcon from "./../../resources/icons/logo.svg";
import CMealsIcon from "./../../resources/icons/meals.svg";
import CCalculatorIcon from "./../../resources/icons/calculator.svg";
import CProductsIcon from "./../../resources/icons/products.svg";
import CChartIcon from "./../../resources/icons/chart.svg";
import { CarbokIcon } from "../../components/styled/CarbokIcon";
import { HomeCard } from "./HomeCard";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [openCalculatorModal, setOpenCalculatorModal] = useState(false);
  return (
    <IonPage>
      <IonContent>
        <Header>
          <Title>
            <CarbokIcon src={CLogoIcon} color="primary" size="54" />
          </Title>
          <IonButtons>
            <IonButton routerLink="/settings" style={{ marginLeft: 8 }}>
              <IonIcon icon={personOutline} slot="icon-only" color="medium" />
            </IonButton>
          </IonButtons>
        </Header>

        <HomeCard title={t("page.home.meals")}>
          <CarbokIcon src={CMealsIcon} size="48" color="secondary" />
          <IonButton routerLink="/meals" color="green" shape="round">
            {t("button.log.meal")}
          </IonButton>
        </HomeCard>

        <HomeCard title={t("page.home.products")}>
          <CarbokIcon src={CProductsIcon} size="52" color="secondary" />
          <IonButton routerLink="/products" color="green" shape="round">
            {t("button.manage.products")}
          </IonButton>
        </HomeCard>

        <HomeCard title={t("page.home.calculator")}>
          <CarbokIcon src={CCalculatorIcon} size="46" color="secondary" />
          <IonButton
            onClick={() => setOpenCalculatorModal(true)}
            color="green"
            shape="round"
          >
            {t("button.calculate")}
          </IonButton>
        </HomeCard>

        <HomeCard title={t("page.home.overview")}>
          <CarbokIcon src={CChartIcon} size="48" color="secondary" />
          <IonButton routerLink="/overview" color="green" shape="round">
            {t("button.view.summary")}
          </IonButton>
        </HomeCard>

        {/* <Card>
          <CardContent>{t("page.home.support")}</CardContent>
        </Card> */}

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
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: 0 0 4px 4px;
  width: 70px;
  height: 70px;
  box-shadow: 0 2px 10px 1px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 16px 16px 24px;
`;
