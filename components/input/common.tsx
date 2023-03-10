import React from "react";
import styled, { css } from "styled-components";

import Text from "../text/text";
import { useInputShadow } from "../../src/utils/mixins";
import { colors, toRem, withOpacity } from "../../src/utils/styles";

export type IconPosition = "before" | "after";

export const inputFocusedLabelStyle = css<{
  error?: string;
}>`
  font-size: ${toRem(10)};
  font-weight: 700;
  top: ${toRem(1)};
  padding-top: ${toRem(1)};
  opacity: 1;
  color: ${({ error }) => (error ? colors.warning : colors.bluedark)};
`;

// when the label is above the text
export const labelAnimation = css`
  ~ label.input-label {
    ${inputFocusedLabelStyle}
  }
  &:focus ~ label.input-label {
    color: ${colors.primary};
  }
`;

export type BaseInputStyleProps = {
  error?: string;
  position?: IconPosition;
  $margin?: number;
};

export const baseInputStyle = css<BaseInputStyleProps>`
  appearance: none;
  outline: none;
  position: relative;
  border-color: ${(props) =>
    props.error ? colors.warning : colors.transparent};
  ${(props) =>
    props.error
      ? useInputShadow(withOpacity(colors.warning, 0.2))
      : "box-shadow:none"};
  border-width: ${toRem(1)};
  border-style: solid;
  border-radius: ${toRem(8)};
  background-color: ${(props) =>
    props.error ? colors.white : colors.bluelighter};
  color: ${colors.darkgrey};
  font-weight: 500;
  font-size: ${toRem(15)};
  padding-bottom: ${toRem(1)};
  padding-left: ${(props) =>
    props.position === "before" ? toRem(60) : toRem(props.$margin)};
  padding-right: ${(props) =>
    props.position === "after" ? toRem(60) : toRem(props.$margin)};
  width: 100%;
  box-sizing: border-box;
  &:focus,
  &:active,
  &:hover {
    border-color: ${colors.primary};
  }
  &:focus {
    background-color: ${colors.white};
    ${useInputShadow(withOpacity(colors.primary, 0.2))};
  }
  &:disabled {
    border-color: transparent;
    background-color: ${withOpacity(colors.bluelighter, 0.5)};
    color: ${withOpacity(colors.darkgrey, 0.5)};
  }
`;

const labelAndPlaceholderStyle = css`
  font-weight: 500;
  font-size: ${toRem(15)};
`;

export const baseInputLabelAndPlaceholderStyle = css<{
  placeholder?: string;
}>`
  &:focus,
  &:not(:placeholder-shown) {
    ${labelAnimation}
  }
  &::placeholder {
    ${labelAndPlaceholderStyle};
    color: ${(props) =>
      props.placeholder
        ? withOpacity(colors.darkgrey, 0.7)
        : colors.transparent};
  }
  &:disabled ~ label.input-label {
    color: ${withOpacity(colors.darkblue, 0.5)};
  }
`;

export const Container = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
`;

export const MessageContainer = styled.div`
  margin-bottom: ${toRem(15)};
`;

export const Message = styled.div`
  min-height: ${toRem(20)};
`;

const StyledLabel = styled.label<{
  position?: IconPosition;
  $margin: number;
}>`
  ${labelAndPlaceholderStyle};
  color: ${withOpacity(colors.darkgrey, 0.7)};
  position: absolute;
  user-select: none;
  left: ${(props) =>
    props.position === "before" ? toRem(60) : toRem(props.$margin)};
  right: ${(props) =>
    props.position === "after" ? toRem(60) : toRem(props.$margin)};
  top: ${toRem(14)};
  transition: all 0.2s ease, background-color 0s;
  transform-origin: 0 0;
  opacity: 0.7;
  display: block;
  cursor: text;
  text-align: left;
  pointer-events: none;
`;

export const StyledIcon = styled.label<{
  position?: IconPosition;
}>`
  line-height: ${toRem(46)};
  position: absolute;
  top: 0;
  left: ${(props) => (props.position === "before" ? toRem(20) : "auto")};
  right: ${(props) => (props.position === "before" ? "auto" : toRem(20))};
  height: ${toRem(46)};
  pointer-events: none;
`;

export const getIconColor = (disabled: boolean, error?: string) => {
  if (error) return colors.warning;
  return disabled ? withOpacity(colors.bluedarker, 0.3) : colors.bluedarker;
};

type InputMessageOrErrorProps = {
  error?: string;
  message?: string;
};

export const InputMessageOrError = ({
  error,
  message,
}: InputMessageOrErrorProps) => (
  <MessageContainer>
    {error && (
      <Message>
        <Text color={colors.warning} fontSize={11} lineHeight={1.2}>
          {error}
        </Text>
      </Message>
    )}
    {message && !error && (
      <Message>
        <Text color={colors.grey} fontSize={13} lineHeight={1.2}>
          {message}
        </Text>
      </Message>
    )}
  </MessageContainer>
);

type InputLabelProps = {
  id: string;
  label: string;
  margin: number;
  iconPosition?: IconPosition;
  className?: string;
};

export const InputLabel = ({
  label,
  id,
  iconPosition,
  margin,
  className,
}: InputLabelProps) => (
  <StyledLabel
    position={iconPosition}
    htmlFor={id}
    className={className ? `input-label ${className}` : "input-label"}
    $margin={margin}
  >
    {label}
  </StyledLabel>
);
