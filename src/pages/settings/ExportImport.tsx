import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonIcon,
  useIonToast,
} from "@ionic/react";
import { downloadOutline, pushOutline } from "ionicons/icons";
import { dataService } from "../../services/DataService";

export const ExportImport: React.FC = () => {
  const { t } = useTranslation();
  const [present, dismiss] = useIonToast();

  const [openImportAlert, setOpenImportAlert] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleExport = async () => {
    try {
      await dataService.exportData()
        .then(() => {
          present({
            message: t("page.settings.toast.export.success"),
            duration: 2000,
            color: "success",
          });
        });
    } catch (e) {
      present({
        message: t("page.settings.toast.export.fail"),
        duration: 2000,
        color: "danger",
      });
    }
  };

  const handleFileSelect = () => {
    const fileInput: HTMLInputElement | null =
      document.querySelector("#data-import");
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleOnImport = (e: any) => {
    setOpenImportAlert(true);
    setFile(e.nativeEvent.target.files[0]);
  };

  const handleImport = () => {
    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", ({ target }) => {
        const result = target?.result;
        if (result && typeof result === "string") {
          try {
            dataService.importData(result);
            resetFile();
            present({
              message: t("page.settings.toast.import.success"),
              duration: 2000,
              color: "success",
            });
          } catch (e) {
            present({
              message: t("page.settings.toast.import.fail"),
              duration: 2000,
              color: "danger",
            });
          }
        }
      });
      reader.readAsText(file);
    }
  };

  const resetFile = () => {
    const fileInput: HTMLInputElement | null =
      document.querySelector("#data-import");
    if (fileInput) {
      fileInput.value = "";
    }
    setFile(null);
  };

  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>
            {t("page.settings.card.title.data")}
          </IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <Button
            color="tertiary"
            expand="block"
            shape="round"
            onClick={handleExport}
          >
            {t("button.export")}
            <IonIcon slot="end" icon={downloadOutline} />
          </Button>
          <Button
            color="tertiary"
            expand="block"
            shape="round"
            onClick={handleFileSelect}
          >
            <IonIcon slot="start" icon={pushOutline} />
            {t("button.import")}
            <input
              hidden
              id="data-import"
              type="file"
              onChange={handleOnImport}
            />
          </Button>
        </IonCardContent>
      </IonCard>
      <IonAlert
        onWillDismiss={() => setFile(null)}
        isOpen={openImportAlert}
        onDidDismiss={() => setOpenImportAlert(false)}
        header={t("page.settings.card.data.alert.title")}
        subHeader={t("page.settings.card.data.alert.subtitle")}
        buttons={[
          {
            text: t("button.cancel"),
            role: "cancel",
            handler: resetFile,
          },
          {
            text: t("button.import"),
            handler: handleImport,
          },
        ]}
      />
    </>
  );
};

const Button = styled(IonButton)`
  margin-top: 12px;
`;
