import { IonIcon, IonItem, IonList, IonText } from "@ionic/react";
import { timeOutline } from "ionicons/icons";
import styled from "styled-components";

interface Props {
  items: any[];
  onClick: (item: string) => void;
}

export const SearchHistoryList: React.FC<Props> = ({ items, onClick }) => {
  return (
    <HistoryList>
      {items.map((item, idx) => (
        <IonItem key={idx} onClick={() => onClick(item)} lines="none" button>
            <IonIcon slot="start" icon={timeOutline} color="light-darker"/>
          <IonText>{item}</IonText>
        </IonItem>
      ))}
    </HistoryList>
  );
};

const HistoryList = styled(IonList)`
  padding: 12px 32px;
`;
