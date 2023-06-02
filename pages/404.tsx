import Link from "next/link";
import { ReactNode } from "react";
import Head from "next/head";
import { GetStaticProps } from "next";

type Error404Props = {
  locale: string;
};

const Error404 = ({ locale }: Error404Props) => (
  <>
    <Head>
      <title>Wecasa copy - 404</title>
      <meta name="description" content="A copy of Wecasa website - Error 404" />
    </Head>
    <p>Error 404</p>
    <p>
      Please return to{" "}
      <Link href="/" locale={locale}>
        homepage
      </Link>
    </p>
  </>
);

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { locale },
});

Error404.getLayout = (page: ReactNode) => <div>{page}</div>;

export default Error404;
