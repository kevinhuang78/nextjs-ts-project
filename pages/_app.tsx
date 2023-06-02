import { ReactElement, ReactNode, useState } from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { createGlobalStyle } from "styled-components";
import { AppProps } from "next/app";
import { NextPage } from "next";
import { appWithTranslation } from "next-i18next";
import { PrismicPreview } from "@prismicio/next";

import Layout from "../components/layout/layout";
import { repositoryName } from "../prismicio";

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
    <PrismicPreview repositoryName={repositoryName}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <GlobalStyle />
          {getLayout(<Component {...pageProps} />)}
        </Hydrate>
      </QueryClientProvider>
    </PrismicPreview>
  );
};

export default appWithTranslation(MyApp);
