import Link from "next/link";
import { GetStaticProps } from "next";

type WecasaProps = {
  universes: { reference: string; title: string }[];
  locale: string;
};

const Wecasa = ({ universes, locale }: WecasaProps) => (
  <div>
    <Link href="/" locale={locale}>
      Go to home
    </Link>
    <h1>Possible universes at Wecasa are :</h1>
    <ul>
      {universes.map(({ title, reference }) => (
        <li key={reference}>{title}</li>
      ))}
    </ul>
  </div>
);

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const res = await fetch("https://www.wecasa.fr/api/v1/universes.json");
  const universes = await res.json();

  return { props: { universes, locale } };
};

export default Wecasa;
