import { IonIcon } from "@ionic/react";
import { person } from "ionicons/icons";
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
  standard = false,
}) => {
  return (
    <Badge>
      <Avatar color={color} size={size}>
        {children}
      </Avatar>
      {!standard && <Icon icon={person} />}
    </Badge>
  );
};

const Badge = styled.div`
  position: absolute;
`;

const Avatar = styled.div`
  width: ${(props: { color: string; size: number }) => props.size}px;
  height: ${(props: { color: string; size: number }) => props.size}px;
  border-radius: 50%;
  margin: 0 4px;
  background-color: ${(props: { color: string; size: number }) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8em;
  color: white;
  text-transform: uppercase;
`;

const Icon = styled(IonIcon)`
  position: absolute;
  bottom: 0;
  right: 0;
`;
