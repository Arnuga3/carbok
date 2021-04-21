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
} from "@ionic/react";
import styled from "styled-components";
import LocaleCode from "locale-code";
import { useAppSettings } from "../../hooks/appSettingsHook";
import { changeAppSettings } from "../../redux/actions/appSettingsActions";
import { ExportImport } from "./ExportImport";

export const Settings: React.FC = () => {
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
      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>{t("page.settings.card.title")}</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem lines="none">
              <IonLabel>{t("page.settings.card.dark.mode")}</IonLabel>
              <IonToggle
                checked={settings.themeMode === "dark"}
                onIonChange={(e) => handleThemeModeChange(e.detail.checked)}
              />
            </IonItem>
            <IonItem lines="none">
              <IonLabel>{t("page.settings.card.language")}</IonLabel>
              <IonSelect
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
        </IonCard>
        <ExportImport />
      </IonContent>
    </IonPage>
  );
};

const HeaderContent = styled.div`
  display: flex;
`;