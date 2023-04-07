import { ReactElement, ReactNode, useState } from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { createGlobalStyle } from "styled-components";
import { AppProps } from "next/app";
import { NextPage } from "next";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import Layout from "../components/layout/layout";
import frTranslations from "../i18n/fr.json";
import enTranslations from "../i18n/en.json";

const languageDetector = new LanguageDetector();
languageDetector.addDetector({
  name: "detectorByDomainName",
  lookup: () => {
    let locale = "fr";

    if (typeof window !== "undefined") {
      locale = window.location.hostname.endsWith(".co.uk") ? "en" : "fr";
    }

    return locale;
  },
});

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(languageDetector)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      fr: {
        translation: frTranslations,
      },
    },
    fallbackLng: "fr",
    supportedLngs: ["fr", "en"],
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    detection: {
      order: ["detectorByDomainName"],
    },
  });

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  // This ensures that data is not shared
  // between different users and requests
  const [queryClient] = useState(() => new QueryClient());
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <GlobalStyle />
        {getLayout(<Component {...pageProps} />)}
      </Hydrate>
    </QueryClientProvider>
  );
};

export default MyApp;
