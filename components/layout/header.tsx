import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, useCallback } from "react";
import HeaderUniverses from "./header-universes";

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px 15px;
`;

const Header = () => {
  const router = useRouter();
  const onChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      router.push(
        { pathname: router.pathname, query: router.query },
        undefined,
        { locale: e.target.value }
      );
    },
    [router]
  );

  return (
    <Container>
      <Link href="/" locale={router.locale}>
        <Image src="/wecasa.svg" alt="Wecasa logo" width={130} height={24} />
      </Link>
      <HeaderUniverses />
      <select onChange={onChange} defaultValue={router.locale}>
        <option value="en">English</option>
        <option value="fr">Français</option>
      </select>
    </Container>
  );
};
export default Header;
