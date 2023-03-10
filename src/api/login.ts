import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import API from "../utils/API";
import { AUTH_TOKEN } from "../constants/login";

type LogUserParams = {
  user: {
    email: string;
    password: string;
  };
};

export const logUserUtils = ({ user }: LogUserParams) =>
  API.post(`${process.env.NEXT_PUBLIC_WECASA_API_URL}/session`, { user }).then(
    (response) => {
      localStorage.setItem(AUTH_TOKEN, response.headers.authorization);
    }
  );

type UseLogUserParams = {
  onSuccess: () => void;
  user: LogUserParams["user"];
};
export const useLogUser = ({ onSuccess, user }: UseLogUserParams) => {
  const {
    mutate: logUser,
    isLoading,
    error: APIErrors,
  } = useMutation(() => logUserUtils({ user }), { onSuccess });
  const error =
    axios.isAxiosError(APIErrors) && APIErrors.response
      ? APIErrors.response.data.error
      : APIErrors;

  return { logUser, isLoading, error };
};
