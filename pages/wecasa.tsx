import Link from "next/link";

type WecasaProps = {
  universes: { reference: string; title: string }[];
};

const Wecasa = ({ universes }: WecasaProps) => (
  <div>
    <Link href="/">Go to home</Link>
    <h1>Possible universes at Wecasa are :</h1>
    <ul>
      {universes.map(({ title, reference }) => (
        <li key={reference}>{title}</li>
      ))}
    </ul>
  </div>
);

export const getStaticProps = async () => {
  const res = await fetch("https://www.wecasa.fr/api/v1/universes.json");
  const universes = await res.json();

  return { props: { universes } };
};

export default Wecasa;
