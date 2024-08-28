import { useState } from "react";

export interface FormValues {
  Name: string;
  Surname: string;
  UserType: string;
  CreatedDate: string;
  City: string;
  Address: string;
}

export const useCreateFormValidation = () => {
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [formData, setFormData] = useState<FormValues>({
    Name: "",
    Surname: "",
    UserType: "",
    CreatedDate: "",
    City: "",
    Address: "",
  });

  const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {};
    if (!values.Name) errors.Name = "Name is required.";
    if (!values.Surname) errors.Surname = "Surname is required.";
    if (!values.UserType) errors.UserType = "User Type is required.";
    if (!values.CreatedDate) errors.CreatedDate = "Created Date is required.";
    if (!values.City) errors.City = "City is required.";
    if (!values.Address) errors.Address = "Address is required.";
    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleBlur = () => {
    const validationErrors = validate(formData);
    setErrors(validationErrors);
  };

  const isFormValid =
    Object.values(formData).every((field) => field.trim() !== "") &&
    Object.keys(errors).length === 0;

  return {
    errors,
    setErrors,
    validate,
    handleChange,
    handleBlur,
    formData,
    isFormValid,
  };
};
