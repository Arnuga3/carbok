import styled from "styled-components";
import img from "./../../resources/images/food.jpg";

interface Props {
  height?: number | string;
}

export const Header: React.FC<Props> = ({ height, children }) => {
  return (
    <HeaderWrapper height={height}>
      <Image src={img} alt="header background" />
      <Gradient />
      <Children>{children}</Children>
    </HeaderWrapper>
  );
};

export const HeaderWrapper = styled.div`
  position: relative;
  min-height: ${(props: { height?: number | string }) => props.height ?? 60}px;
`;

const Children = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 100%;
  z-index: 4;
`;

const Image = styled.img`
  position: absolute;
  opacity: 0.35;
  z-index: 2;
`;

const Gradient = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0,0,0, 0.5) 0%,
    var(--ion-color-tertiary) 100%
  );
  z-index: 3;
`;
