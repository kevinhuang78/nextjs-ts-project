import {
  memo,
  useState,
  useCallback,
  forwardRef,
  ChangeEvent,
  FocusEvent,
} from "react";
import styled from "styled-components";
import InputMask from "react-input-mask";

import {
  baseInputStyle,
  baseInputLabelAndPlaceholderStyle,
  Container,
  InputLabel,
  InputMessageOrError,
  IconPosition,
} from "./common";
import { toRem } from "../../src/utils/styles";

const StyledInput = styled.input.attrs<{
  placeholder: string;
  label: string;
}>((props) => ({
  "aria-label": props.placeholder && props.label,
}))`
  ${baseInputStyle}
  ${baseInputLabelAndPlaceholderStyle}
  height: ${toRem(46)};
  padding-top: ${toRem(1)};
`;

export type InputType =
  | "text"
  | "password"
  | "email"
  | "number"
  | "time"
  | "date"
  | "tel";
export type InputMode =
  | "none"
  | "text"
  | "decimal"
  | "numeric"
  | "search"
  | "email"
  | "url";

type InputProps = {
  error?: string;
  message?: string;
  name: string;
  onBlur?: () => void;
  placeholder?: string;
  showMessage?: boolean;
  value?: string | number;
  autoComplete?: string;
  className?: string;
  disabled?: boolean;
  iconName?: string;
  iconPosition?: IconPosition;
  id: string;
  inputMode?: InputMode;
  label: string;
  mask?: string | string[] | RegExp[];
  margin?: number;
  max?: string;
  min?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  showLabel?: boolean;
  step?: number;
  type?: InputType;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      type = "text",
      name,
      label,
      iconName,
      iconPosition = "after",
      placeholder,
      error,
      message,
      onBlur,
      onFocus,
      onChange,
      autoComplete,
      value,
      inputMode,
      min,
      max,
      step,
      className,
      mask,
      readOnly = false,
      margin = 15,
      showMessage = true,
      showLabel = true,
      disabled = false,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const onInputBlur = useCallback(() => {
      setIsFocused(false);
      if (onBlur) onBlur();
    }, [onBlur]);

    const onInputFocus = useCallback(
      (event) => {
        setIsFocused(true);
        if (onFocus) onFocus(event);
      },
      [onFocus]
    );

    const inputProps = {
      position: iconName ? iconPosition : undefined,
      type,
      label,
      id,
      name,
      placeholder: ((isFocused || !showLabel) && placeholder) || " ",
      error,
      autoComplete,
      ref,
      inputMode,
      min,
      max,
      step,
      $margin: margin,
    };

    const maskedInputProps = {
      onBlur: onInputBlur,
      onFocus: onInputFocus,
      onChange,
      value,
      readOnly,
      disabled,
    };

    return (
      <Container className={className}>
        {mask ? (
          <InputMask mask={mask} maskPlaceholder={null} {...maskedInputProps}>
            <StyledInput {...inputProps} />
          </InputMask>
        ) : (
          <StyledInput {...inputProps} {...maskedInputProps} />
        )}
        {showLabel && (
          <InputLabel
            label={label}
            id={id}
            iconPosition={iconName ? iconPosition : undefined}
            margin={margin}
          />
        )}
        {showMessage && <InputMessageOrError error={error} message={message} />}
      </Container>
    );
  }
);

export type { InputProps };
export default memo(Input);
