import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonIcon,
  IonPage,
  IonText,
} from "@ionic/react";
import { settingsOutline } from "ionicons/icons";
import moment from "moment";

import ProductsImage from "../../resources/images/products2.png";
import CalculatorImage from "../../resources/images/calculator2.png";
import MealsImage from "../../resources/images/pizza.png";
import StatisticsImage from "../../resources/images/stats1.png";
import { dateService } from "../../services/DateService";
import { App, BackButtonListenerEvent } from "@capacitor/app";

const Home: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    App.addListener("backButton", (e: BackButtonListenerEvent) => {
      if (!e.canGoBack) {
        App.exitApp();
      }
    });
    return () => {
      App.removeAllListeners();
    };
  }, []);

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
          <CardContent>
            <IonText color="white">
              <CardTitle>{t("page.home.products")}</CardTitle>
            </IonText>
          </CardContent>
          <CardImageOverlay />
          <CardImage src={ProductsImage} alt="Products" />
        </Card>

        <Card routerLink="/calculator">
          <CardContent>
            <IonText color="white">
              <CardTitle>{t("page.home.calculator")}</CardTitle>
            </IonText>
          </CardContent>
          <CardImageOverlay />
          <CardImage src={CalculatorImage} alt="Products" />
        </Card>

        <Card routerLink="/meals">
          <CardContent>
            <IonText color="white">
              <CardTitle>{t("page.home.meals")}</CardTitle>
            </IonText>
          </CardContent>
          <CardImageOverlay />
          <CardImage src={MealsImage} alt="Products" />
        </Card>

        <Card routerLink="/overview">
        <CardContent>
            <IonText color="white">
              <CardTitle>{t("page.home.overview")}</CardTitle>
            </IonText>
          </CardContent>
          <CardImageOverlay />
          <CardImage src={StatisticsImage} alt="Products" />
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
  position: relative;
  height: 150px;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.2);
  margin-top: 12px;
  background-color: var(--ion-color-tortoise);
`;

const CardContent = styled(IonCardContent)`
  height: 150px;
  width: 50%;
  display: flex;
  align-items: center;
`;

const CardImage = styled.img`
  position: absolute;
  top: 0;
  right: 0%;
  height: 150px;
  filter: brightness(0.9) contrast(1.2);
`;

const CardImageOverlay = styled.div`
  // position: absolute;
  // top: 0;
  // left: 0%;
  // height: 150px;
  // width: 100%;
  // opacity: 0.2;
  // background-color: var(--ion-color-tertiary);
  // z-index: 100;
`;

const CardTitle = styled.div`
  font-size: 1.8em;
  padding: 4px;
`;
