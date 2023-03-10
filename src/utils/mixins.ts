import { css, CSSObject, SimpleInterpolation } from "styled-components";

import { ALL_MIN } from "../../constants/breakpoints";
import { colors, toRem, withOpacity } from "./styles";

export const minWidth = (
  Object.keys(ALL_MIN) as Array<keyof typeof ALL_MIN>
).reduce((accumulator, label) => {
  accumulator[label] = (
    first: TemplateStringsArray | CSSObject,
    ...args: SimpleInterpolation[]
  ) => css`
    @media (min-width: ${ALL_MIN[label]}) {
      ${css(first, ...args)};
    }
  `;
  return accumulator;
}, {} as { [index: string]: Function });

export const useInputShadow = (color: string) => css`
  box-shadow: 0 0 0 ${toRem(4)} ${color};
`;

export const boxShadowOnHover = css`
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:active {
    box-shadow: 0 ${toRem(14)} ${toRem(28)} ${withOpacity(colors.black, 0.1)},
      0 ${toRem(10)} ${toRem(10)} ${withOpacity(colors.black, 0.07)};
  }

  /*
   * https://stackoverflow.com/questions/23885255/how-to-remove-ignore-hover-css-style-on-touch-devices
   * The goal here is to remove the hover effect on mobile because it causes some weird behaviors on
   * chrome
   */
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      box-shadow: 0 ${toRem(14)} ${toRem(28)} ${withOpacity(colors.black, 0.1)},
        0 ${toRem(10)} ${toRem(10)} ${withOpacity(colors.black, 0.07)};
    }
  }
`;
