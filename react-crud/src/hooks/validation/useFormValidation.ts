import { useState } from "react";
import { Data } from "../../App";

export type FormValues = {
  Name: string;
  Surname: string;
  UserType: string;
  City: string;
  Address: string;
  CreatedDate: string;
};

type Errors = Partial<Record<keyof Data, string>>;
type Touched = Partial<Record<keyof Data, boolean>>;

export const useFormValidation = () => {
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Touched>({});

  const validate = (newInputs: FormValues) => {
    const newErrors: Errors = {};

    if (!newInputs.Name) {
      newErrors.Name = "This field is required";
    }
    if (!newInputs.Surname) {
      newErrors.Surname = "This field is required";
    }
    if (!newInputs.Address) {
      newErrors.Address = "This field is required";
    }
    if (!newInputs.City) {
      newErrors.City = "This field is required";
    }
    if (!newInputs.UserType) {
      newErrors.UserType = "This field is required";
    }
    if (!newInputs.CreatedDate) {
      newErrors.CreatedDate = "This field is required";
    }

    return newErrors;
  };

  return { errors, setErrors, touched, setTouched, validate };
};
