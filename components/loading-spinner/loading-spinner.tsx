import React, { memo } from "react";
import styled, { keyframes } from "styled-components";
import { toRem } from "../../src/utils/styles";
import colors from "../../constants/colors";

const PATH =
  "m 27.27,96.26 c -0.3,7.68 1.69,17.93 1.94,18.9 6.84,26.45 30.97,40.6 51.64,40.92 0.8,0.01 1.58,0.02 2.36,0.02 8.5,0 19.57,-0.73 29.84,-6.42 10.68,-7.11 15.24,-11.73 18.16,-15.67 3.11,-4.45 6.05,-9.67 8.73,-15.52 6.55,-14.29 6.84,-28.67 0.77,-38.47 -3.63,-5.86 -9.22,-9.2 -15.72,-9.41 h -0.04 c -7.12,0.19 -12.76,3.26 -16.32,8.87 -5.81,9.17 -5.35,24.12 1.2,39 2.54,5.78 5.03,10.67 7.59,14.95 l 4.69,7.84 c 3.2,4.79 8.92,7.37 12.81,9.56 8.36,4.85 17.13,5.24 26.9,5.24 14.96,0 30.11,-7.1 41.57,-19.49 17.01,-18.41 24.92,-47.09 22.28,-80.75 -0.15,-1.93 -0.39,-3.81 -0.63,-5.57 l -0.01,-0.05 -0.01,-0.05 c -1.6,-11.04 -4.9,-21.41 -7.67,-28.77";

const keyFrame = keyframes`
  0%   { stroke-dashoffset: 0; }
  50%  { stroke-dashoffset: 523; }
  100% { stroke-dashoffset: 0; }
`;

const Svg = styled.svg<{
  $size: number;
}>`
  width: ${(props) => toRem(props.$size)};
  height: ${(props) => toRem(props.$size)};
  display: inline-block;
  vertical-align: middle;
`;

const Path = styled.path<{
  $color: string;
}>`
  fill: transparent;
  stroke: ${(props) => props.$color};
  stroke-width: 25;
  stroke-linecap: round;
  stroke-dasharray: 523;
  stroke-dashoffset: 523;
  animation: ${keyFrame} 2s infinite;
`;

export const LoadingSpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

type LoadingSpinnerProps = {
  color?: string;
  className?: string;
  size?: number;
  title?: string;
};

const LoadingSpinner = ({
  color = colors.primary,
  size = 100,
  title,
  className,
}: LoadingSpinnerProps) => (
  <Svg
    $size={size}
    className={className}
    role="img"
    viewBox="0 0 253.39 177.49"
    xmlns="http://www.w3.org/2000/svg"
  >
    {!!title && <title>{title}</title>}
    <Path $color={color} d={PATH} />
  </Svg>
);

export default memo(LoadingSpinner);
