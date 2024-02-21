import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) =>
  axios
    .get(url)
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.error(e));

const useUser = () => {
  const { data, isLoading, mutate } = useSWR("/api/user", fetcher);
  return {
    data,
    isLoading,
    mutate,
  };
};

export default useUser;
