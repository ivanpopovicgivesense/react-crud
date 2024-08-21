import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Data } from "../App";
import { useGetUsers } from "./useGetUsers";

export const useGetUser = (id: string | undefined) => {
  const { API_URL } = useGetUsers();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [initFormData, setInitFormData] = useState<Data | null>();
  const [formData, setFormData] = useState<Data | null>();

  const fetchUser = useCallback(() => {
    if (!id) return;
    setIsLoading(true);
    axios
      .get(`${API_URL}/${id}`)
      .then((response) => {
        setInitFormData(response.data);
        setFormData(response.data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [id, setIsLoading, setError, API_URL]);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetchUser();
    }
  }, [id, fetchUser, setIsLoading]);

  return {
    setIsLoading,
    setError,
    isLoading,
    error,
    initFormData,
    formData,
    setFormData,
    setInitFormData,
  };
};
