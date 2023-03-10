import styled from "styled-components";
import Link from "next/link";
import { Universe } from "../../src/types/wecasa";
import colors from "../../constants/colors";
import { minWidth } from "../../src/utils/mixins";

import { useGetUniverses } from "../../src/api/universes";

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
  const { universes, error, isLoading } = useGetUniverses();

  if (isLoading) return <div>It is loading!</div>;
  if (error) return <div>{String(error)}</div>;

  return (
    <Universes>
      {universes.map(({ reference, title }: Universe) => (
        <StyledLink key={reference} href={`/universe/${reference}`}>
          {title}
        </StyledLink>
      ))}
      <StyledLink href="/login">Connexion</StyledLink>
    </Universes>
  );
};
export default HeaderUniverses;
