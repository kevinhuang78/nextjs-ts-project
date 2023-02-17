import Link from "next/link";
import { ReactNode } from "react";
import Head from "next/head";

const Error404 = () => (
  <>
    <Head>
      <title>Wecasa copy - 404</title>
      <meta name="description" content="A copy of Wecasa website - Error 404" />
    </Head>
    <p>Error 404</p>
    <p>
      Please return to <Link href="/">homepage</Link>
    </p>
  </>
);

Error404.getLayout = (page: ReactNode) => <div>{page}</div>;

export default Error404;
