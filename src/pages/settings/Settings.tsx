import React, { useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import { useTranslation } from "react-i18next";

const Settings: React.FC = () => {
  const { t } = useTranslation();
  const [checked, setChecked] = useState(false);
  const [gender, setGender] = useState<string>();
  return (
    <IonPage>
      <IonHeader slot="fixed">
        <IonToolbar color="primary">
          <IonTitle>{t("page.settings.title")}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>App Settings</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem lines="none">
              <IonLabel>Dark Mode</IonLabel>
              <IonToggle
                checked={checked}
                onIonChange={(e) => setChecked(e.detail.checked)}
              />
            </IonItem>
            <IonItem lines="none">
              <IonLabel>Language</IonLabel>
              <IonSelect
                value={gender}
                onIonChange={(e) => setGender(e.detail.value)}
              >
                <IonSelectOption value="female">English</IonSelectOption>
                <IonSelectOption value="male">Russian</IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
