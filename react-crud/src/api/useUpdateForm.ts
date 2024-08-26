import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { Data } from "../App";
import { useGetUsers } from "./useGetUsers";
import { useNavigate } from "react-router-dom";

type FormValue = {
  ime: string | null;
  prezime: string | null;
  datumRodjenja: string | null;
  tipKorisnika: string | null;
  grad: string | null;
  adresa: string | null;
};

const initFormValue = ({
  Name,
  Surname,
  Address,
  City,
  UserType,
  CreatedDate,
}: Data): FormValue => ({
  ime: Name,
  prezime: Surname,
  datumRodjenja: CreatedDate,
  tipKorisnika: UserType,
  grad: City,
  adresa: Address,
});

export const useUpdateForm = (id: string | undefined) => {
  const { API_URL } = useGetUsers();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [formData, setFormData] = useState<FormValue>({
    ime: "",
    prezime: "",
    datumRodjenja: "",
    tipKorisnika: "",
    grad: "",
    adresa: "",
  });
  const [original, setOriginal] = useState<Data>({
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
        setFormData(initFormValue(response.data));
        setOriginal(response.data);
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

  const isFormChanged = useMemo(() => {
    return (
      JSON.stringify(initFormValue(original!)) !== JSON.stringify(formData)
    );
  }, [original, formData]);

  const handleSubmit = () => {
    if (!formData || !id) return;

    setIsLoading(true);
    axios
      .put(`${API_URL}/${id}`, formData)
      .then(() => navigate("/"))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
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
  };
};
