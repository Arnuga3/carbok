import { IonIcon } from "@ionic/react";
import { heartCircle } from "ionicons/icons";
import styled from "styled-components";

export const HeartIcon: React.FC = () => {
  return (
    <HeartIconWrapper>
      <IonIcon icon={heartCircle} color="danger" />
    </HeartIconWrapper>
  );
};

export const HeartIconWrapper = styled.div`
  background-color: var(--ion-color-white);
  position: absolute;
  bottom: 0;
  right: -8px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
