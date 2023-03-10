type ParsedTextItem = {
  text: string;
  bold: boolean;
};

const textParser = (text: string, bold: boolean): ParsedTextItem[] => {
  const sepIndex = text.indexOf("**");
  if (sepIndex === -1) return [{ text, bold }];
  if (sepIndex === 0) return textParser(text.substring(2), !bold);
  return [
    { text: text.substring(0, sepIndex), bold },
    ...textParser(text.substring(sepIndex + 2), !bold),
  ];
};

export const isStringEmpty = (stringToTest?: string | null) =>
  !stringToTest || stringToTest.trim() === "";

export const parseText = (text: string) =>
  textParser(text, false).filter(
    (item: ParsedTextItem) => !isStringEmpty(item.text)
  );
