import { css, CSSObject, SimpleInterpolation } from 'styled-components';

import { ALL_MIN } from '../constants/breakpoints';

export const minWidth = (Object.keys(ALL_MIN) as Array<keyof typeof ALL_MIN>).reduce((accumulator, label) => {
  accumulator[label] = (first: TemplateStringsArray | CSSObject, ...args: SimpleInterpolation[]) => css`
    @media (min-width: ${ALL_MIN[label]}) {
      ${css(first, ...args)};
    }
  `;
  return accumulator;
}, {} as { [index: string]: Function });
