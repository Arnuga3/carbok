import { IonIcon } from "@ionic/react";
import { heart } from "ionicons/icons";
import styled from "styled-components";

interface Props {
  color: string;
  size?: number;
  standard?: boolean;
}

export const CircleBadge: React.FC<Props> = ({
  color,
  size = 10,
  children,
  standard = true,
}) => {
  return (
    <Badge>
      <Avatar color={color} size={size}>
        {children}
      </Avatar>
      {!standard && (
        <IconWrapper>
          <Icon icon={heart} color="primary" />
        </IconWrapper>
      )}
    </Badge>
  );
};

const Badge = styled.div`
  position: relative;
`;

const Avatar = styled.div`
  width: ${(props: { color: string; size: number }) => props.size}px;
  height: ${(props: { color: string; size: number }) => props.size}px;
  border-radius: 50%;
  background-color: ${(props: { color: string; size: number }) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 4px;
  font-size: 0.8em;
  color: white;
  text-transform: uppercase;
`;

const IconWrapper = styled.div`
  background-color: var(--ion-color-light);
  position: absolute;
  bottom: 0;
  right: -8px;
  border-radius: 100%;
  width: 18px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled(IonIcon)`
  padding-top: 2px;
`;
