import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
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
import { useAppSettings } from "../../hooks/appSettingsHook";
import { changeAppSettings } from "../../redux/actions/appSettingsActions";

export const Settings: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch()
  const { settings } = useAppSettings();
  const [checked, setChecked] = useState(false);

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    dispatch(changeAppSettings({...settings, language}));
  };

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
                value={settings.language}
                onIonChange={(e) => handleLanguageChange(e.detail.value)}
              >
                <IonSelectOption value="en-GB">English</IonSelectOption>
                <IonSelectOption value="ru-RU">Russian</IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};
