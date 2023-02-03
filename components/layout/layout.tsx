import { PropsWithChildren } from "react";
import Head from "next/head";
import Header from "./header";
import Footer from "./footer";

type LayoutProps = PropsWithChildren & {
  meta?: {
    title?: string;
    description?: string;
    icon?: string;
  };
};

const Layout = ({
  meta = {
    title: "Wecasa copy",
    description: "A copy of Wecasa website",
  },
  children,
}: LayoutProps) => {
  const { title, description, icon = "/favicon.ico" } = meta;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href={icon} />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
