import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Head from "next/head";
import { Category, Universe as UniverseType, Zone } from "../../types/wecasa";

const fetchUniverses = () =>
  fetch(`${process.env.NEXT_PUBLIC_WECASA_API_URL}/universes.json`).then(
    (res) => res.json()
  );

const Universe = () => {
  const router = useRouter();
  const { universe: universeReference } = router.query;
  const {
    data: universes,
    error,
    isLoading,
  } = useQuery(["universes"], fetchUniverses);

  if (isLoading) return <div>Is loading !</div>;
  if (error) return <div>Error !</div>;

  const {
    title,
    minimum_price: minimumPrice,
    zones,
    categories,
  } = universes.find(
    (universeItem: UniverseType) => universeItem.reference === universeReference
  );

  return (
    <>
      <Head>
        <title>{`Wecasa copy - ${title}`}</title>
        <meta
          name="description"
          content={`A copy of Wecasa website - Services à partir de ${
            minimumPrice / 100
          }€`}
        />
      </Head>
      <h1>{title}</h1>
      <p>We propose these services :</p>
      <ul>
        {categories.map((category: Category) =>
          category.subcategories.map((subcategory) =>
            subcategory.prestations.map(
              ({ reference, title: serviceTitle }) => (
                <li key={reference}>{serviceTitle}</li>
              )
            )
          )
        )}
      </ul>
      <p>We are currently implemented in these departments :</p>
      <ul>
        {zones.map((zone: Zone) =>
          zone.area_codes.map((code) => <li key={code}>{code}</li>)
        )}
      </ul>
    </>
  );
};

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["universes"], fetchUniverses);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export const getStaticPaths = () => ({
  paths: [
    { params: { universe: "beauty" } },
    { params: { universe: "childcare" } },
    { params: { universe: "cleaning" } },
    { params: { universe: "haircut" } },
    { params: { universe: "massage" } },
    { params: { universe: "sports_coaching" } },
  ],
  fallback: false,
});

export default Universe;
