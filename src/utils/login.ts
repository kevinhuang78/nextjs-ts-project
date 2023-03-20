import { AUTH_TOKEN } from "../constants/login";

export const isLoggedIn = () =>
  typeof window !== "undefined" && !!localStorage.getItem(AUTH_TOKEN);
