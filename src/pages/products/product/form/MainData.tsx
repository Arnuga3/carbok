import React from "react";
import {
  IonInput,
  IonItem,
  IonLabel,
  IonChip,
  IonButton,
  IonIcon,
} from "@ionic/react";
import styled from "styled-components";
import { pencil, warningOutline } from "ionicons/icons";
import { IProductDummy } from "../EditProduct";
import { useTranslation } from "react-i18next";

interface Props {
  data: IProductDummy;
  categoryValid: boolean;
  onNameChange: (name: string) => void;
  onCategoryModalOpen: any;
}

export const MainData: React.FC<Props> = ({
  data,
  categoryValid,
  onNameChange,
  onCategoryModalOpen,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <IonItem>
        <IonInput
          value={data.name}
          onIonInput={(e: any) => onNameChange(e.target.value)}
        ></IonInput>
      </IonItem>
      <Row>
        {data && data?.category?.type ? (
          <>
            <IonChip color="primary" outline>
              <IonLabel color="primary">{t(data.category.nameKey)}</IonLabel>
            </IonChip>
            <IonChip color="medium" onClick={onCategoryModalOpen}>
              <IonLabel></IonLabel>
              <IonIcon color="medium" icon={pencil} />
              <IonLabel></IonLabel>
            </IonChip>
          </>
        ) : (
          <IonButton
            color={categoryValid ? "secondary" : "danger"}
            shape="round"
            onClick={onCategoryModalOpen}
          >
            {!categoryValid && <IonIcon icon={warningOutline} />}
            {t("page.products.button.category")}
          </IonButton>
        )}
      </Row>
    </>
  );
};

const Row = styled.div`
  margin: 18px 0;
`;
