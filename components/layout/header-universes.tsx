import styled from "styled-components";
import Link from "next/link";
import { useCallback } from "react";
import { useRouter } from "next/router";
import { Universe } from "../../src/types/wecasa";
import colors from "../../constants/colors";
import { minWidth } from "../../src/utils/mixins";

import { useGetUniverses } from "../../src/api/universes";
import { AUTH_TOKEN } from "../../src/constants/login";
import { isLoggedIn } from "../../src/utils/login";

const Universes = styled.nav`
  display: none;

  ${minWidth.md`display: block;`}
`;

const StyledLink = styled(Link)`
  margin-left: 20px;
  color: ${colors.darkgrey};
  text-decoration: none;
`;

const HeaderUniverses = () => {
  const router = useRouter();
  const { universes, error, isLoading } = useGetUniverses();

  const disconnect = useCallback(() => {
    localStorage.removeItem(AUTH_TOKEN);
  }, []);

  if (isLoading) return <div>It is loading!</div>;
  if (error) return <div>{String(error)}</div>;

  return (
    <Universes>
      {universes.map(({ reference, title }: Universe) => (
        <StyledLink
          key={reference}
          href={`/universe/${reference}`}
          locale={router.locale}
        >
          {title}
        </StyledLink>
      ))}
      {isLoggedIn() ? (
        <>
          <StyledLink href="/customer-area/dashboard" locale={router.locale}>
            Mon compte
          </StyledLink>
          <StyledLink href="/" locale={router.locale} onClick={disconnect}>
            Me déconnecter
          </StyledLink>
        </>
      ) : (
        <StyledLink href="/login" locale={router.locale}>
          Connexion
        </StyledLink>
      )}
    </Universes>
  );
};
export default HeaderUniverses;
