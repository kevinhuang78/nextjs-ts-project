import styled from "styled-components";
import useSWR from "swr";
import Link from "next/link";
import { Universe } from "../../types/wecasa";
import colors from "../../constants/colors";
import { minWidth } from "../../utils/mixins";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

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
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_WECASA_API_URL}/universes.json`,
    fetcher
  );

  if (isLoading) return <div>It is loading!</div>;
  if (error) return <div>{String(error)}</div>;

  return (
    <Universes>
      {data.map(({ reference, title }: Universe) => (
        <StyledLink key={reference} href={`/universe/${reference}`}>
          {title}
        </StyledLink>
      ))}
    </Universes>
  );
};
export default HeaderUniverses;
