/* eslint-disable react/no-array-index-key */
import React, { memo } from "react";
import styled, { css } from "styled-components";

import { toRem } from "../../src/utils/styles";
import colors from "../../constants/colors";
import { parseText } from "../../src/utils/strings";

type FontWeight = 400 | 500 | 700;

const defaultColor = colors.darkgrey;
const defaultFontSize = 15;
const defaultLineHeight = 1.333;
const defaultFontWeight: FontWeight = 400;

const TextsContainer = styled.span<{
  $display?: string;
  $centered: boolean;
  $lineHeight?: number;
  $fontSize?: number;
}>`
  display: ${(props) => props.$display};
  text-align: ${(props) => (props.$centered ? "center" : "left")};
  line-height: ${(props) => props.$lineHeight || defaultLineHeight};
  font-size: ${(props) => toRem(props.$fontSize) || defaultFontSize};
`;

type TextStyleProps = {
  $display?: string;
  $fontSize?: number;
  $fontWeight?: FontWeight;
  $lineHeight?: number;
  $centered?: boolean;
  $color?: string;
};

export const textStyle = css<TextStyleProps>`
  ${(props) => `
    font-size: ${toRem(props.$fontSize || defaultFontSize)};
    font-weight: ${props.$fontWeight || defaultFontWeight};
    line-height: ${props.$lineHeight || defaultLineHeight};
    text-align: ${props.$centered ? "center" : "left"};
    color: ${props.$color || defaultColor};
  `};
`;

const StyledText = styled.span<TextStyleProps>`
  display: ${(props) => props.$display};
  ${textStyle}
`;

export type TextProps = {
  id?: string;
  display?: "block" | "inline" | "inline-block";
  color?: string;
  fontSize?: number;
  lineHeight?: number;
  fontWeight?: FontWeight;
  centered?: boolean;
  className?: string;
  htmlTag?: React.ElementType;
  children: string | number;
};

const Text = ({
  id,
  children = "",
  color = defaultColor,
  fontSize = defaultFontSize,
  fontWeight = defaultFontWeight,
  lineHeight = defaultLineHeight,
  centered = false,
  className,
  htmlTag,
  display,
}: TextProps) => {
  const textChildren = children ?? ""; // if children is `null`, defaultProps ('') will not be used.
  const parsedText = parseText(String(textChildren));

  if (!parsedText.length) return null;

  /*
   * We set a div container if parsing returns multiple texts so that they are
   * rendered side by side, like a standard sentence. Without it, each text would
   * be rendered as a unique child of the parent component, and in this case each of
   * them would inherit its display property, it could lead to unwated / broken layouts.
   */
  return parsedText.length > 1 ? (
    <TextsContainer
      id={id}
      as={htmlTag}
      $display={display || "block"}
      $centered={centered}
      $fontSize={fontSize}
      $lineHeight={lineHeight}
    >
      {parsedText.map((text, index) => (
        <StyledText
          key={index}
          $fontWeight={text.bold ? 700 : fontWeight}
          $color={color}
          $fontSize={fontSize}
          $lineHeight={lineHeight}
          className={className}
        >
          {text.text}
        </StyledText>
      ))}
    </TextsContainer>
  ) : (
    <StyledText
      id={id}
      $fontWeight={parsedText[0].bold ? 700 : fontWeight}
      $color={color}
      $fontSize={fontSize}
      $lineHeight={lineHeight}
      $centered={centered}
      className={className}
      as={htmlTag}
      $display={display}
    >
      {parsedText[0].text}
    </StyledText>
  );
};

export default memo(Text);
