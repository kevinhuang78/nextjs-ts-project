import styled from "styled-components";

const Container = styled.footer`
  padding-top: 20px;
  margin: 30px auto;
  width: 80%;
  border-top: 1px solid rgba(16, 54, 85, 0.1);
`;

const List = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
`;

const Item = styled.li`
  display: inline-flex;
  margin: 10px 30px 0 0;
  justify-content: center;
`;

const Footer = () => (
  <Container>
    <List>
      <Item>Mentions légales</Item>
      <Item>CGU Wecasa</Item>
      <Item>CGU Wecasa Care</Item>
      <Item>Politique de confidentialité</Item>
      <Item>Info. des consommateurs</Item>
      <Item>Cookies</Item>
    </List>
  </Container>
);

export default Footer;
