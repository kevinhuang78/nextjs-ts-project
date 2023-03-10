import Image from "next/image";
import styled from "styled-components";
import InfiniteScroller from "../components/infinite-scroller/infinite-scroller";
import { NextPageWithLayout } from "./_app";
import { minWidth } from "../src/utils/mixins";
import colors from "../constants/colors";

const HORIZONTAL_MARGIN = 20;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  position: relative;

  ${minWidth.md`height: 360px;`}
  ${minWidth.xl`height: 430px;`}
`;

const CardsSectionTitle = styled.h1`
  margin: 30px 20px;
  color: ${colors.darkblue};
  font-weight: bold;
  font-size: 54px;
`;

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background-color: ${colors.cream};
  width: calc(100% - ${HORIZONTAL_MARGIN * 2}px);
  height: 100%;
  aspect-ratio: 1 / 1;
  margin: 10px ${HORIZONTAL_MARGIN}px;
  color: ${colors.darkblue};
  font-weight: 700;
  font-size: 38px;
  text-align: center;

  ${minWidth.md`
    width: calc(25% - ${HORIZONTAL_MARGIN * 2}px);
  `}
`;

const Service = styled.span`
  margin: 0 15px;
`;

const Home: NextPageWithLayout = () => (
  <>
    <InfiniteScroller>
      {Array.from(Array(10).keys()).map(
        () =>
          "This is a fake website inspired by Wecasa website so I can train on Next.js "
      )}
    </InfiniteScroller>
    <ImageContainer>
      <Image src="/home/home-bg.jpeg" alt="A vacuum" fill priority />
    </ImageContainer>
    <CardsSectionTitle>Les services les plus utilisés :</CardsSectionTitle>
    <Cards>
      {[
        "Coloration cheveux",
        "Coupe de cheveux enfant",
        "Soins cheveux",
        "Brushing cheveux",
        "Coupe de cheveux homme",
        "Lissage cheveux",
        "Coupe de cheveux femme",
        "Coupe de cheveux",
        "Coiffure mariée",
        "Coiffure",
      ].map((service) => (
        <Card key={service}>
          <Service>{service}</Service>
        </Card>
      ))}
    </Cards>
  </>
);

export default Home;
