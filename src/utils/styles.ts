export const toRem = (fontSize = 15): string => `${fontSize / 15}rem`;

export const hexToRgb = (hex: string): [number, number, number] => {
  const results = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return results
    ? [
        parseInt(results[1], 16),
        parseInt(results[2], 16),
        parseInt(results[3], 16),
      ]
    : [0, 0, 0];
};

export const withOpacity = (hexColor: string, opacity: number): string =>
  `rgba(${hexToRgb(hexColor).concat(opacity).join(", ")})`;

const darkgrey = "#404041";
const mediumlightgrey = "#f7f7f7";
const mediumgrey = "#e9e9e9";
const white = "#ffffff";

export const colors: Record<string, string> = {
  a20darkGrey: withOpacity(darkgrey, 0.2),
  darkblue: "#103655",
  blue: "#1b7cc0",
  bluedarker: "#0E0E2C",
  bluedark: "#103655",
  bluelight: "#c0d3e5",
  bluelighter: "#edf2f8", // rename when the colors panel is finished
  checkboxblue: "#e6edf5",
  cornflowerBlue: "#2f97b3",
  cream: "#f7eddb",
  darkprimary: "#de613c",
  fushia: "#FF82BF",
  purple: "#a630c3",
  white,
  black: "#000000",
  primary: "#ea663f",
  darkgrey,
  orangelight: "#f99e7a",
  slightorange: "#fdccb5",
  green: "#079c66",
  greenlighter: "#27ae60",
  yellow: "#f0cc00",
  yellowlight: "#FCF2BC",
  red: "#e13f48",
  warning: "#e13f48",
  grey: "#9b9b9b",
  mediumlightgrey,
  mediumextralightgrey: "#c7c7c7",
  mediumgrey,
  transparent: "transparent",
  pink: "#f7cddc",
  mediumpink: "#ff82bf",
  // helpers
  background: white,
  border: mediumgrey,
  disabled: withOpacity(darkgrey, 0.7),
  facebook: "#1877F2",
  darkgreyAlpha70: withOpacity(darkgrey, 0.7),
};

/**
 * Returns the most contrasted text color for a given background color.
 * @param hexBgColor Full hexadecimal string background color to get a text color for.
 * @example
 * - getTextColorForBackground('#ffffff') = colors.darkgrey.
 * - getTextColorForBackground('#000000') = colors.white
 * @links
 * https://stackoverflow.com/a/3943023/6593810
 */
export const getTextColorForBackground = (
  hexBgColor: string,
  darkColor: string = colors.darkgrey,
  lightColor: string = colors.white
): string => {
  const [red, green, blue] = hexToRgb(hexBgColor);
  return red * 0.299 + green * 0.587 + blue * 0.114 > 186
    ? darkColor
    : lightColor;
};
