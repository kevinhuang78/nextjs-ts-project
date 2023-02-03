import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import HeaderUniverses from "./header-universes";

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px 15px;
`;

const Header = () => (
  <Container>
    <Link href="/">
      <Image src="/wecasa.svg" alt="Wecasa logo" width={130} height={24} />
    </Link>
    <HeaderUniverses />
  </Container>
);
export default Header;
