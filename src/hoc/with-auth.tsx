import { useRouter } from "next/router";
import { AUTH_TOKEN } from "../constants/login";

const withAuth = (Component: any) => {
  const Auth = (props: any) => {
    const router = useRouter();

    if (typeof window !== "undefined") {
      // Login data added to props via redux-store (or use react context for example)
      const isLoggedIn = !!localStorage.getItem(AUTH_TOKEN);

      // If user is not logged in, return login component
      if (!isLoggedIn) {
        router.push("/login");
      }
    }

    // If user is logged in, return original component
    return <Component {...props} />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
