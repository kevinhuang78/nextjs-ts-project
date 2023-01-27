import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

const Container = styled.header`
  padding: 25px 15px;
`;

const Universes = styled.nav``;

const Header = () => (
  <Container>
    <Link href="/">
      <Image src="/wecasa.svg" alt="Wecasa logo" width={130} height={24} />
    </Link>
    <Universes />
  </Container>
);

export default Header;
