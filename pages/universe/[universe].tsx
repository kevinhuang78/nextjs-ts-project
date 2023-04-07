import { dehydrate, QueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import {
  Category,
  Universe as UniverseType,
  Zone,
} from "../../src/types/wecasa";
import { fetchUniverses, useGetUniverses } from "../../src/api/universes";

const Universe = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "screens.universe" });
  const router = useRouter();
  const { universe: universeReference } = router.query;
  const { universes, error, isLoading } = useGetUniverses();

  if (isLoading) return <div>Is loading !</div>;
  if (error) return <div>{String(error)}</div>;

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
          content={t("seo.title", { price: minimumPrice / 100 }) || ""}
        />
      </Head>
      <h1>{title}</h1>
      <p>{t("sections.services")}</p>
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
      <p>{t("sections.departments")}</p>
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
