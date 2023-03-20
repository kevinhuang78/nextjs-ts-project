import { useRouter } from "next/router";
import { useEffect } from "react";
import { isLoggedIn } from "../utils/login";

const withAuth = (Component: any) => {
  const Auth = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      if (!isLoggedIn()) {
        // If user is not logged in, return login component
        router.push("/login");
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
