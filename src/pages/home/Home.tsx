import React from "react";
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
import { settingsOutline } from "ionicons/icons";
import moment from "moment";

import CMealsIcon from "./../../resources/icons/meals.svg";
import CCalculatorIcon from "./../../resources/icons/calculator.svg";
import CProductsIcon from "./../../resources/icons/products.svg";
import CChartIcon from "./../../resources/icons/chart.svg";
import { CarbokIcon } from "../../components/styled/CarbokIcon";

import ProductsImage from "../../resources/images/products.jpg";
import CalculatorImage from "../../resources/images/calc.jpg";
import MealsImage from "../../resources/images/meals.jpg";
import StatisticsImage from "../../resources/images/stats.jpg";
import { dateService } from "../../services/DateService";

const Home: React.FC = () => {
  const { t } = useTranslation();
  return (
    <IonPage>
      <IonContent>
        <Header>
          <div>
            <IonText>
              <h3>{t("page.home.title")}</h3>
            </IonText>
            <IonText color="tertiary">
              <small>
                {moment(dateService.dateNoTime(new Date())).format(
                  "dddd, D MMM YYYY"
                )}
              </small>
            </IonText>
          </div>
          <IonButtons>
            <IonButton routerLink="/settings" style={{ marginLeft: 8 }}>
              <IonIcon icon={settingsOutline} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </Header>

        <Card routerLink="/products">
          <CardOverlay />
          <CardBackgroundLighter src={ProductsImage} alt="Products" />
          <CardOverlay />
          <IonCardHeader>
            <IonCardTitle color="secondary">{t("page.home.products")}</IonCardTitle>
          </IonCardHeader>
          <CardContent>
            <CarbokIcon src={CProductsIcon} size="50" color="light" />
          </CardContent>
        </Card>

        <Card routerLink="/calculator">
          <CardBackground src={CalculatorImage} alt="Calculator" />
          <CardOverlay />
          <IonCardHeader>
            <IonCardTitle color="secondary">
              {t("page.home.calculator")}
            </IonCardTitle>
          </IonCardHeader>
          <CardContent>
            <CarbokIcon src={CCalculatorIcon} size="44" color="light" />
          </CardContent>
        </Card>

        <Card routerLink="/meals">
          <CardBackground src={MealsImage} alt="Meals" />
          <CardOverlay />
          <IonCardHeader>
            <IonCardTitle color="secondary">{t("page.home.meals")}</IonCardTitle>
          </IonCardHeader>
          <CardContent>
            <CarbokIcon src={CMealsIcon} size="48" color="light" />
          </CardContent>
        </Card>

        <Card routerLink="/overview">
          <CardBackground src={StatisticsImage} alt="Overview" />
          <CardOverlay />
          <IonCardHeader>
            <IonCardTitle color="secondary">{t("page.home.overview")}</IonCardTitle>
          </IonCardHeader>
          <CardContent>
            <CarbokIcon src={CChartIcon} size="48" color="light" />
          </CardContent>
        </Card>

        {/* <Card>
          <CardContent>{t("page.home.support")}</CardContent>
        </Card> */}
      </IonContent>
    </IonPage>
  );
};

export default React.memo(Home);

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 16px 16px 24px;
`;

const Card = styled(IonCard)`
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.1);
  margin-top: 12px;
  border-radius: 16px;
`;

const CardContent = styled(IonCardContent)`
  display: flex;
  margin: 24px 0 6px 0;
`;

const CardBackgroundLighter = styled.img`
  position: absolute;
  filter: grayscale(40%) brightness(1.6) contrast(75%);
`;

const CardBackground = styled.img`
  position: absolute;
  filter: grayscale(40%);
`;

const CardOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, black, transparent);
`;
