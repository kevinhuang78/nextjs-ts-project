import React, { memo, useMemo, useCallback } from "react";

import LoadingSpinner from "../loading-spinner/loading-spinner";
import Text from "../text/text";

import {
  ButtonSize,
  ButtonType,
  getColors,
  SIZES,
  SIZES_CONFIG,
  StyledButton,
  StyledLoadingWrapper,
  TYPES,
} from "./common";
import { useOnClickThrottled } from "../../src/hooks/use-on-click-throttled";

export type ButtonProps = {
  children: string | number;
  isDisabled?: boolean;
  isLoading?: boolean;
  size?: ButtonSize;
  hasFullWidth?: boolean;
  isRound?: boolean;
  type?: ButtonType;
  onPress?: () => void;
  isSubmit?: boolean;
  className?: string;
};

const Button = ({
  onPress,
  children,
  hasFullWidth = false,
  size = "md",
  type = "primary",
  isDisabled = false,
  isLoading = false,
  isRound = true,
  isSubmit = false,
  className,
}: ButtonProps) => {
  const sizes = SIZES_CONFIG[size];

  const { color, backgroundColor, borderColor, loadingSpinnerColor } = useMemo(
    () => getColors(type, isDisabled, isLoading),
    [type, isDisabled, isLoading]
  );

  // To avoid rapid double clicks
  const onPressThrottled = useOnClickThrottled(onPress);

  const shouldBeDisabled = isDisabled || isLoading;

  const onPressBtn = useCallback(() => {
    if (!shouldBeDisabled) {
      onPressThrottled();
    }
  }, [shouldBeDisabled, onPressThrottled]);

  return (
    <StyledButton
      className={className}
      type={isSubmit ? "submit" : "button"}
      disabled={shouldBeDisabled}
      onClick={onPressBtn}
      $sizes={sizes}
      $isRound={isRound}
      $backgroundColor={backgroundColor}
      $borderColor={borderColor}
      $type={type}
      $hasFullWidth={hasFullWidth}
    >
      {isLoading && (
        <StyledLoadingWrapper>
          <LoadingSpinner
            color={loadingSpinnerColor}
            size={30}
            title="Chargement..."
          />
        </StyledLoadingWrapper>
      )}
      <Text color={color} fontWeight={500} fontSize={sizes.fontSize} centered>
        {children}
      </Text>
    </StyledButton>
  );
};

export default memo(Button);

export { TYPES, SIZES };
