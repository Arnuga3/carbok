import React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import LocaleCode from "locale-code";
import { useAppSettings } from "../../hooks/appSettingsHook";
import { changeAppSettings } from "../../redux/actions/appSettingsActions";
import { downloadOutline, pushOutline } from "ionicons/icons";
import { MealsStorageService } from "../../services/MealsStorageService";
import { ProductsStorageService } from "../../services/ProductsStorageService";

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

  const handleExport = async () => {
    const mealsStorageSvc = new MealsStorageService();
    const productsStorageSvc = new ProductsStorageService();

    const data = {
      meals: await mealsStorageSvc.getAllData(),
      products: await productsStorageSvc.getAllData(),
    };

    const a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob([JSON.stringify(data)], {type : 'application/json'}));
    a.download = `${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
              <IonLabel>{t("page.settings.card.dark.language")}</IonLabel>
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
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>
              {t("page.settings.card.title.data")}
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <Button
              color="tertiary"
              size="large"
              expand="block"
              shape="round"
              onClick={handleExport}
            >
              {t("button.export")}
              <IonIcon slot="end" icon={downloadOutline} />
            </Button>
            <Button color="tertiary" size="large" expand="block" shape="round">
              <IonIcon slot="start" icon={pushOutline} />
              {t("button.import")}
            </Button>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

const Button = styled(IonButton)`
  margin-top: 12px;
`;
