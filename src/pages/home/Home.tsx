import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonPage,
  IonText,
} from "@ionic/react";
import { Content } from "./Content";
import { link, personOutline } from "ionicons/icons";
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
      <IonContent>
        <Header>
          <Title>
            <CarbokIcon src={CLogoIcon} color="green" size="54" />
          </Title>
          <IonButtons>
            <IonButton routerLink="/settings" style={{ marginLeft: 8 }}>
              <IonIcon icon={personOutline} slot="icon-only" color="medium" />
            </IonButton>
          </IonButtons>
        </Header>

        <Card>
          <CardContent>
            <CarbokIcon src={CMealsIcon} size="48" color="secondary" />
            <IonButton routerLink="/meals" color="green" shape="round">
              {t("page.home.meals")}
            </IonButton>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <CarbokIcon src={CProductsIcon} size="52" color="secondary" />
            <IonButton routerLink="/products" color="green" shape="round">
              {t("page.home.products")}
            </IonButton>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <CarbokIcon src={CCalculatorIcon} size="48" color="secondary" />
            <IonButton
              onClick={() => setOpenCalculatorModal(true)}
              color="green"
              shape="round"
            >
              {t("page.home.calculator")}
            </IonButton>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <CarbokIcon src={CChartIcon} size="48" color="secondary" />
            <IonButton routerLink="/overview" color="green" shape="round">
              {t("page.home.overview")}
            </IonButton>
          </CardContent>
        </Card>

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
  align-items: flex-end;
  margin-right: 12px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 16px 12px 24px;
`;

const Card = styled(IonCard)`
  border-radius: 24px;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.1);
  padding: 8px 0 8px 8px;
  margin-top: 16px;
`;

const CardContent = styled(IonCardContent)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
