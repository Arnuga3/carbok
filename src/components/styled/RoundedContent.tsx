import { IonContent } from "@ionic/react";
import styled from "styled-components";

export const RoundedContent = styled(IonContent)`
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.5);
  z-index: 99;
`;
