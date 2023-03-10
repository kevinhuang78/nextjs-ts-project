import Head from "next/head";
import styled from "styled-components";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import Input from "../components/input/input";
import Button from "../components/button/button";
import { useLogUser } from "../src/api/login";
import { isStringEmpty } from "../src/utils/strings";

const Container = styled.div`
  margin: 0 20px;
`;

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const onSuccess = useCallback(() => {}, []);

  const { logUser, isLoading, error } = useLogUser({ user: form, onSuccess });

  const updateForm = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { name, value } = target;

    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      logUser();
    },
    [logUser]
  );

  return (
    <Container>
      <Head>
        <title>Wecasa copy - Connexion</title>
        <meta
          name="description"
          content="A copy of Wecasa website - Page de connexion"
        />
      </Head>
      <h1>Connexion</h1>
      {error ? <div>{String(error)}</div> : null}
      <form onSubmit={onSubmit}>
        <Input
          type="email"
          name="email"
          id="email"
          label="E-mail"
          value={form.email}
          onChange={updateForm}
        />
        <Input
          type="password"
          name="password"
          id="password"
          label="Mot de passe"
          value={form.password}
          onChange={updateForm}
        />
        <Button
          isSubmit
          size="lg"
          isLoading={isLoading}
          isDisabled={isStringEmpty(form.email) || isStringEmpty(form.password)}
          hasFullWidth
        >
          Se connecter
        </Button>
      </form>
    </Container>
  );
};

export default Login;
