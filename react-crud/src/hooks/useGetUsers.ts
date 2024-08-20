import { useState, useEffect } from "react";
import axios from "axios";
import { Data } from "../App";
import { Error } from "../App";

export const useGetUsers = () => {
  const [data, setData] = useState<Data[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const API_URL = "http://localhost:3000/person";

  const fetchUsers = () => {
    setIsLoading(true);
    axios
      .get(API_URL)
      .then((response) => setData(response.data))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    fetchUsers,
    data,
    setData,
    isLoading,
    setIsLoading,
    setError,
    error,
  };
};
