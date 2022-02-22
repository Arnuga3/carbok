import { IonLabel } from "@ionic/react";
import React from "react";
import styled from "styled-components";

interface Props {
  active?: boolean;
}

export const ChipLabel: React.FC<Props> = ({ children, active }) => {
  return (
    <>
      {active && <ActiveLight />}
      {!active && <InactiveLight />}
      <Label>{children}</Label>
    </>
  );
};

const Label = styled(IonLabel)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 0.9em;
`;

const ActiveLight = styled.div`
  min-width: 8px;
  min-height: 8px;
  margin-right: 6px;
  border-radius: 100%;
  background-color: var(--ion-color-secondary);
`;

const InactiveLight = styled.div`
  min-width: 8px;
  min-height: 8px;
  margin-right: 6px;
  border-radius: 100%;
  background-color: var(--ion-color-light);
`;
