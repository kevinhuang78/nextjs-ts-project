import { PropsWithChildren } from "react";
import Head from "next/head";
import Header from "./header";
import Footer from "./footer";

type LayoutProps = PropsWithChildren;

const Layout = ({ children }: LayoutProps) => (
  <>
    <Head>
      <title>Wecasa copy</title>
      <meta name="description" content="A copy of Wecasa website" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
);

export default Layout;
