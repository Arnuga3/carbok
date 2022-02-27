import {
  IonButton,
  IonText,
  IonModal,
  IonDatetime,
  DatetimeChangeEventDetail,
} from "@ionic/react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

interface Props {
  open: boolean;
  title?: string;
  date?: Date;
  onDateChange: (date: Date | null) => void;
  onClose: () => void;
}

export const DatetimeModal: React.FC<Props> = ({
  open,
  date,
  title,
  onDateChange,
  onClose,
}) => {
  const { t, i18n } = useTranslation();

  return (
    <IonModal isOpen={open}>
      <Content>
        <IonText>
          <Title>{title}</Title>
        </IonText>
        <IonDatetime
          value={date?.toISOString() || null}
          locale={i18n.language}
          presentation="date"
          onIonChange={(e: CustomEvent<DatetimeChangeEventDetail>) => {
            onDateChange(e.detail.value ? new Date(e.detail.value) : null);
          }}
        />
        <IonButton onClick={onClose}>{t("button.close")}</IonButton>
      </Content>
    </IonModal>
  );
};

const Content = styled.div`
  height: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h2`
  margin-bottom: 24px;
`;
