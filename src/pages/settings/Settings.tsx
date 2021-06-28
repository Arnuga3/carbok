import React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonToggle,
} from "@ionic/react";
import styled from "styled-components";
import LocaleCode from "locale-code";
import { useAppSettings } from "../../hooks/appSettingsHook";
import { changeAppSettings } from "../../redux/actions/appSettingsActions";
import { ExportImport } from "./ExportImport";
import icon from "./../../resources/icons/logo.svg";
import { version } from "./../../../package.json";

const Settings: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { settings } = useAppSettings();

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    dispatch(changeAppSettings({ ...settings, language }));
  };

  const handleThemeModeChange = (enabled: boolean) => {
    document.body.classList.toggle("dark", enabled);
    dispatch(
      changeAppSettings({ ...settings, themeMode: enabled ? "dark" : "light" })
    );
  };

  return (
    <IonPage>
      <IonContent>
        <Card>
          <IonCardHeader>
            <IonCardSubtitle color="light">{t("page.settings.card.title")}</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem lines="none" color="none">
              <IonLabel>{t("page.settings.card.dark.mode")}</IonLabel>
              <IonToggle
                checked={settings.themeMode === "dark"}
                onIonChange={(e) => handleThemeModeChange(e.detail.checked)}
              />
            </IonItem>
            <IonItem lines="none" color="none">
              <IonLabel>{t("page.settings.card.language")}</IonLabel>
              <IonSelect color="none"
                value={settings.language}
                onIonChange={(e) => handleLanguageChange(e.detail.value)}
              >
                {Object.keys(i18n.store.data).map((language, i) => (
                  <IonSelectOption key={i} value={language}>
                    {LocaleCode.getLanguageNativeName(language)}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </IonCardContent>
        </Card>
        <ExportImport />
        <Version>
          <IonIcon src={icon}></IonIcon>
          <small>v{version}</small>
        </Version>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(Settings);

const Card = styled(IonCard)`
  border-radius: 20px;
  margin-top: 16px;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(to right, #2a9d8f, #43a790, #59b091, #6db992, #81c293);
`;

const Version = styled.div`
  text-align: center;
  color: var(--ion-color-medium);
  margin-top: 16px;

  & small {
    margin-left: 4px;
  }
`;
