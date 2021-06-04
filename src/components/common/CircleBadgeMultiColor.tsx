import styled from "styled-components";

interface Props {
  colors: string[];
  size?: number;
}

export const CircleBadgeMultiColor: React.FC<Props> = ({
  colors,
  size = 10,
  children,
}) => {
  return (
    <Badge colors={colors} size={size}>
      {children}
    </Badge>
  );
};

const Badge = styled.div`
  width: ${(props: { colors: string[]; size: number }) => props.size}px;
  height: ${(props: { colors: string[]; size: number }) => props.size}px;
  border-radius: 50%;
  margin: 0 2px 0 4px;
  background-image: linear-gradient(
    135deg,
    ${(props: { colors: string[]; size: number }) => props.colors.sort().join(",")}
  );
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8em;
  color: white;
  text-transform: uppercase;
`;
