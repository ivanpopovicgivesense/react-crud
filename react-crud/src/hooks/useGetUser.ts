import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Data } from "../App";
import { useParams } from "react-router-dom";
import { useGetUsers } from "./useGetUsers";

export const useGetUser = () => {
  const { setIsLoading, setError } = useGetUsers();
  const { userId } = useParams<{ userId: string }>();
  const [initFormData, setInitFormData] = useState<Data | null>();
  const [formData, setFormData] = useState<Data | null>();

  const API_URL = "http://localhost:3000/person";

  const fetchUser = useCallback(() => {
    if (!userId) return;
    setIsLoading(true);
    axios
      .get(`${API_URL}/${userId}`)
      .then((response) => {
        setInitFormData(response.data);
        setFormData(response.data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [userId, setIsLoading, setError, API_URL]);

  useEffect(() => {
    if (userId) {
      setIsLoading(true);
      fetchUser();
    }
  }, [userId, fetchUser, setIsLoading]);

  return {
    initFormData,
    formData,
    fetchUser,
    userId,
    setFormData,
    setInitFormData,
  };
};
