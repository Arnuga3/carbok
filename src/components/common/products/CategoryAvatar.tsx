import styled from "styled-components";
import { HeartIcon } from "./HeartIcon";

interface Props {
  colors: string | string[];
  size?: number;
  standard?: boolean;
}

export const CategoryAvatar: React.FC<Props> = ({
  colors,
  size = 10,
  children,
  standard = true,
}) => {
  return (
    <Badge>
      {typeof colors === "string" ? (
        <AvatarSingleColor color={colors} size={size}>
          {children}
          {!standard && <HeartIcon />}
        </AvatarSingleColor>
      ) : (
        <AvatarMultiColor colors={colors} size={size}>
          {children}
          {!standard && <HeartIcon />}
        </AvatarMultiColor>
      )}
    </Badge>
  );
};

const Badge = styled.div`
  position: relative;
  font-size: 0.8em;
  color: white;
  text-transform: uppercase;
`;

const AvatarMultiColor = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props: { colors: string[]; size: number }) => props.size}px;
  height: ${(props: { colors: string[]; size: number }) => props.size}px;
  background-image: linear-gradient(
    135deg,
    ${(props: { colors: string[]; size: number }) =>
      props.colors.sort().join(",")}
  );
  border-radius: 50%;
  margin: 0 4px;
`;

const AvatarSingleColor = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props: { color: string; size: number }) => props.size}px;
  height: ${(props: { color: string; size: number }) => props.size}px;
  background-color: ${(props: { color: string; size: number }) => props.color};
  border-radius: 50%;
  margin: 0 4px;
`;
