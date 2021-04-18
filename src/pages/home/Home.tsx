import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { ChartCards } from "./ChartCards";

const Home: React.FC = () => {
  const { t } = useTranslation();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>{t("page.home.title")}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ChartCards />
      </IonContent>
    </IonPage>
  );
};

export default Home;
