import styled from "styled-components";

interface Props {
  color: string;
  size?: number;
}

export const CircleBadge: React.FC<Props> = ({ color, size = 10, children }) => {
  return <Badge color={color} size={size}>{children}</Badge>;
};

const Badge = styled.div`
  width: ${(props: { color: string; size: number }) => props.size}px;
  height: ${(props: { color: string; size: number }) => props.size}px;
  border-radius: 50%;
  margin: 0 2px 0 4px;
  background-color: ${(props: { color: string; size: number }) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8em;
  color: white;
  text-transform: uppercase;
`;
