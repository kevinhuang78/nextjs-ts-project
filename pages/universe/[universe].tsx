import { dehydrate, QueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import styled from "styled-components";

import {
  Category,
  Universe as UniverseType,
  Zone,
} from "../../src/types/wecasa";
import { fetchUniverses, useGetUniverses } from "../../src/api/universes";
import { getTranslations, toPrismicLocale } from "../../src/utils/i18n";
import { UNIVERSES } from "../../constants/universes";
import { LOCALES } from "../../constants/i18n";
import { createClient } from "../../prismicio";

const LEFT_SPACE_FOR_LIST = 15;

const FAQList = styled.ul`
  padding-left: ${LEFT_SPACE_FOR_LIST}px;
`;

const FAQListText = styled.p`
  margin-left: -${LEFT_SPACE_FOR_LIST}px;
`;

type PrismicContentType =
  | "heading1"
  | "paragraph"
  | "list-item"
  | "o-list-item";

type PrismicContent = {
  type: PrismicContentType;
  text: string;
  spans: {
    start: number;
    end: number;
    type: "hyperlink" | string;
    data: { link_type: "Web"; target?: "_blank"; url: string };
  }[];
};

type UniverseProps = {
  universesLandingPages: {
    alternate_languages: string[];
    data: {
      faq_title: PrismicContent[];
      questions_and_answers: {
        answer: PrismicContent[];
        question: PrismicContent[];
      }[];
      title: PrismicContent[];
      universe: {
        reference: string;
        type: string;
        uid: string;
      };
    };
    first_publication_date: string;
    href: string;
    id: string;
    lang: string;
    linked_documents: string[];
    slugs: string[];
    tags: string[];
    type: string;
    uid: string;
    url: string | null;
  }[];
};

type FAQTextProps = Pick<PrismicContent, "text" | "spans">;

const FAQText = ({ text, spans }: FAQTextProps) => {
  if (spans.length === 0 || spans[0].type !== "hyperlink") return text;

  return (
    <a href={spans[0].data.url} target={spans[0].data.target}>
      {text}
    </a>
  );
};

const Universe = ({ universesLandingPages }: UniverseProps) => {
  const { t } = useTranslation("screens", { keyPrefix: "universe" });
  const router = useRouter();
  const { universe: universeReference } = router.query;
  const { universes, error, isLoading } = useGetUniverses();
  const universeFAQ = universesLandingPages.find(
    (page) => page.data.universe.reference === universeReference
  );

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
      {!!universeFAQ && (
        <>
          <h2>FAQ : {universeFAQ.data.faq_title[0].text}</h2>
          <div>
            {universeFAQ.data.questions_and_answers.map(
              ({ question, answer }) => {
                const isAnswerAList = answer.some(
                  ({ type }) => type === "list-item"
                );

                return (
                  <>
                    <h3>{question[0].text}</h3>
                    {isAnswerAList ? (
                      <FAQList>
                        {answer.map(({ text, type, spans }) =>
                          type === "list-item" || type === "o-list-item" ? (
                            <li key={text}>{FAQText({ text, spans })}</li>
                          ) : (
                            <FAQListText key={text}>
                              {FAQText({ text, spans })}
                            </FAQListText>
                          )
                        )}
                      </FAQList>
                    ) : (
                      answer.map(({ text, spans }) => (
                        <p key={text}>{FAQText({ text, spans })}</p>
                      ))
                    )}
                  </>
                );
              }
            )}
          </div>
        </>
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({
  locale,
  previewData,
}) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["universes"], fetchUniverses);
  const prismicClient = createClient({ previewData });
  const page = await prismicClient.getByType("universe", {
    lang: toPrismicLocale(locale),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await getTranslations({ locale, namespaces: ["screens"] })),
      universesLandingPages: page.results,
    },
  };
};

export const getStaticPaths = () => ({
  paths: UNIVERSES.flatMap((universe) =>
    LOCALES.map((locale) => ({ locale, params: { universe } }))
  ),
  fallback: false,
});

export default Universe;
