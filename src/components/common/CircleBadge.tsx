import styled from "styled-components";

interface Props {
  color: string;
}

export const CircleBadge: React.FC<Props> = ({ color }) => {
  return <Badge color={color}></Badge>;
};

const Badge = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 4px;
  background-color: ${({ color }) => color};
`;
