import { IonToolbar } from "@ionic/react";
import React from "react";
import styled from "styled-components";

interface Props {
  top?: boolean;
}

export const Toolbar: React.FC<Props> = ({ top = true, children }) => {
  return (
    <ToolbarWrapper top={top}>
      <ToolbarStyled>{children}</ToolbarStyled>
    </ToolbarWrapper>
  );
};

export const ToolbarWrapper = styled.div`
  animation-name: fade;
  animation-duration: 0.5s;

  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  border-bottom: ${(props: { top: boolean }) =>
    props.top ? "1px solid transparent" : "1px solid rgba(0, 0, 0, 0.1)"};
`;

export const ToolbarStyled = styled(IonToolbar)`
  padding: 4px 8px;
`;
