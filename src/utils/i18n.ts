import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { DEFAULT_LOCALE } from "../../constants/i18n";

type GetTranslationsParams = {
  locale?: string;
  namespaces: string[];
};

export const getTranslations = async ({
  locale,
  namespaces,
}: GetTranslationsParams) =>
  serverSideTranslations(locale || DEFAULT_LOCALE, namespaces);

export const toPrismicLocale = (locale?: string) => {
  if (!locale) return "fr-fr";

  switch (locale) {
    case "en":
      return "en-gb";
    case "fr":
    default:
      return "fr-fr";
  }
};
