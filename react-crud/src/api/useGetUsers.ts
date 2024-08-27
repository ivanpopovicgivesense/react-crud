import { useState, useEffect } from "react";
import axios from "axios";
import { Error } from "../App";

export const useGetUsers = <T>(url: string) => {
  const [data, setData] = useState<T | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    axios
      .get<T>(url)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, [url]);

  return {
    data,
    setData,
    isLoading,
    setIsLoading,
    setError,
    error,
  };
};
