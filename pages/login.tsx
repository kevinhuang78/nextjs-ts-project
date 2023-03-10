import Head from "next/head";
import styled from "styled-components";
import Input from "../components/input/input";
import Button from "../components/button/button";

const Container = styled.div`
  margin: 0 20px;
`;

const Login = () => (
  <Container>
    <Head>
      <title>Wecasa copy - Connexion</title>
      <meta
        name="description"
        content="A copy of Wecasa website - Page de connexion"
      />
    </Head>
    <h1>Connexion</h1>
    <form>
      <Input type="email" name="email" id="email" label="E-mail" />
      <Input
        type="password"
        name="password"
        id="password"
        label="Mot de passe"
      />
      <Button
        isSubmit
        size="lg"
        /* isLoading={userIsLoading || emailCheckIsLoading}
        isDisabled={invalid} */
        hasFullWidth
      >
        Se connecter
      </Button>
    </form>
  </Container>
);

export default Login;
