import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.data);

const Container = styled.header`
  padding: 25px 15px;
`;

const Universes = styled.nav``;

const Header = () => (
  /* const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_WECASA_API_URL}/universes.json`,
    fetcher
  ); */

  <Container>
    <Link href="/">
      <Image src="/wecasa.svg" alt="Wecasa logo" width={130} height={24} />
    </Link>
    <Universes />
  </Container>
);
export default Header;
