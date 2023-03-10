import styled from "styled-components";

import { boxShadowOnHover } from "../../src/utils/mixins";
import colors from "../../constants/colors";
import { toRem, withOpacity } from "../../src/utils/styles";

export type ButtonType = "primary" | "secondary" | "success" | "danger";
export type ButtonSize = "md" | "lg";

export const TYPES = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  SUCCESS: "success",
  DANGER: "danger",
};

export const SIZES = {
  MD: "md",
  LG: "lg",
};

type SizeConfig = {
  fontSize: number;
  height: number;
  paddingHorizontal: number;
};

export const SIZES_CONFIG: Record<ButtonSize, SizeConfig> = {
  md: {
    fontSize: 15,
    height: 33,
    paddingHorizontal: 17,
  },
  lg: {
    fontSize: 17,
    height: 46,
    paddingHorizontal: 20,
  },
};

export const getColors = (
  type: ButtonType,
  isDisabled: boolean,
  isLoading: boolean
) => {
  let backgroundColor;
  let color;
  let borderColor;
  let iconColor;
  let loadingSpinnerColor;

  switch (type) {
    case TYPES.SECONDARY:
      color = colors.darkblue;
      backgroundColor = colors.transparent;
      borderColor = colors.darkblue;
      iconColor = colors.darkblue;
      loadingSpinnerColor = colors.darkblue;
      break;

    case TYPES.SUCCESS:
      color = colors.white;
      backgroundColor = colors.green;
      borderColor = colors.green;
      iconColor = colors.white;
      loadingSpinnerColor = colors.white;
      break;

    case TYPES.DANGER:
      color = colors.white;
      backgroundColor = colors.red;
      borderColor = colors.red;
      iconColor = colors.white;
      loadingSpinnerColor = colors.white;
      break;

    default:
      color = colors.white;
      backgroundColor = colors.primary;
      borderColor = colors.primary;
      iconColor = colors.white;
      loadingSpinnerColor = colors.white;
  }

  if (isDisabled) {
    if (type === TYPES.SECONDARY) {
      color = withOpacity(color, 0.3);
      iconColor = withOpacity(iconColor, 0.3);
      borderColor = withOpacity(borderColor, 0.3);
      loadingSpinnerColor = withOpacity(loadingSpinnerColor, 0.3);
    } else {
      backgroundColor = withOpacity(backgroundColor, 0.3);
      borderColor = colors.transparent;
    }
  }

  if (isLoading) {
    color = colors.transparent;
    iconColor = colors.transparent;
  }

  return {
    color,
    backgroundColor,
    borderColor,
    iconColor,
    loadingSpinnerColor,
  };
};

export const StyledLoadingWrapper = styled.span`
  position: absolute;
`;

export const StyledIconWrapper = styled.span<{
  $sizes: SizeConfig;
}>`
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: ${toRem(7)};
  height: ${(props) => toRem(props.$sizes.fontSize)};
`;

export const StyledButton = styled.button<{
  $sizes: SizeConfig;
  $type: ButtonType;
  $borderColor: string;
  $isRound: boolean;
  $backgroundColor: string;
  $hasFullWidth: boolean;
}>`
  position: relative;
  display: inline-flex;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-decoration: none;

  ${(props) => `
    font-size: ${toRem(props.$sizes.fontSize)}};
    cursor: ${props.disabled ? "not-allowed" : "pointer"};
    height: ${toRem(props.$sizes.height)};
    padding: 0 ${toRem(props.$sizes.paddingHorizontal)};
    border: ${toRem(1)} solid ${props.$borderColor};
    border-radius: ${toRem(props.$isRound ? 30 : 0)};
    background-color: ${props.$backgroundColor};
    width: ${props.$hasFullWidth ? "100%" : "auto"};
  `}

  ${({ disabled, $type }) =>
    !disabled && $type !== "secondary" && boxShadowOnHover}
  
  ${({ $type }) =>
    $type !== "secondary"
      ? `
    &:hover {
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      text-decoration: none;
      filter: brightness(105%);
    }

    &:active {
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      text-decoration: none;
      filter: brightness(95%);
    }
  `
      : `
    &:hover {
      background-color: ${withOpacity(colors.bluelight, 0.2)};
    }

    &:active {
      background-color: ${withOpacity(colors.bluelight, 0.35)};
    }
  `}
`;
