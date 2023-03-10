import { useQuery } from "@tanstack/react-query";
import API from "../utils/API";

export const fetchUniverses = () =>
  API.get(`${process.env.NEXT_PUBLIC_WECASA_API_URL}/universes.json`).then(
    (response) => response.data
  );

export const useGetUniverses = () => {
  const {
    data: universes,
    error,
    isLoading,
  } = useQuery(["universes"], fetchUniverses);

  return { universes, error, isLoading };
};
