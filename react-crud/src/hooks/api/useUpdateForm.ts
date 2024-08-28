import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { Data } from "../../App";
import { useNavigate } from "react-router-dom";
import { useUpdateFormValidation } from "../validation/useUpdateFormValidation";

export type FormValue = {
  ime: string | null;
  prezime: string | null;
  adresa: string | null;
  grad: string | null;
  tipKorisnika: string | null;
  datumRodjenja: string | null;
};

export const useUpdateForm = (id: string | undefined) => {
  const { errors } = useUpdateFormValidation();
  const API_URL = "http://localhost:3000/person";

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [original, setOriginal] = useState<Data>({
    id: "",
    Name: "",
    Surname: "",
    Address: "",
    City: "",
    UserType: "",
    CreatedDate: "",
  });

  const [formData, setFormData] = useState<Data>({
    id: "",
    Name: "",
    Surname: "",
    Address: "",
    City: "",
    UserType: "",
    CreatedDate: "",
  });

  const navigate = useNavigate();

  const fetchUser = useCallback(() => {
    if (!id) return;
    setIsLoading(true);
    axios
      .get<Data>(`${API_URL}/${id}`)
      .then((response) => {
        console.log("fetched User Data:", response.data);
        setFormData(response.data);
        setOriginal(response.data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [id, setIsLoading, setError]);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetchUser();
    }
  }, [id, fetchUser, setIsLoading]);

  const isFormChanged = useMemo(() => {
    const originalValues = {
      ...original,
      CreatedDate: new Date(original.CreatedDate).toString(),
    };
    const formDataValues = {
      ...formData,
      CreatedDate: new Date(formData.CreatedDate).toString(),
    };
    return JSON.stringify(originalValues) !== JSON.stringify(formDataValues);
  }, [original, formData]);

  const handleSubmit = () => {
    if (!formData || !id) return;
    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      axios
        .put(`${API_URL}/${id}`, formData)
        .then((response) => {
          console.log("updated User Data:", response.data);
          navigate("/");
        })
        .catch((err) => setError(err.message))
        .finally(() => setIsLoading(false));
    }
  };

  return {
    setIsLoading,
    setError,
    isLoading,
    error,
    formData,
    setFormData,
    isFormChanged,
    handleSubmit,
    navigate,
    errors,
  };
};
