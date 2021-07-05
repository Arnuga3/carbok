import { IonIcon } from "@ionic/react";
import styled from "styled-components";

export const CarbokIcon = styled(IonIcon)`
  font-size: ${(props: {size?: string}) => props.size ?? 32}px;
  margin-right: 4px;
`;
