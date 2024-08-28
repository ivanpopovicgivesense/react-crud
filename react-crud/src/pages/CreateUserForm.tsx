import React, { useState } from "react";
import { Button, Input, Label, Spinner } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface FormValues {
  Name: string;
  Surname: string;
  UserType: string;
  CreatedDate: string;
  City: string;
  Address: string;
}

export const CreateUserForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [formData, setFormData] = useState<FormValues>({
    Name: "",
    Surname: "",
    UserType: "",
    CreatedDate: "",
    City: "",
    Address: "",
  });

  const API_URL = "http://localhost:3000/person/";
  const navigate = useNavigate();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    axios
      .post(API_URL, formData)
      .then((response) =>
        console.log(`User created ${JSON.stringify(response.data)}`)
      )
      .then(() => navigate("/"))
      .catch((error) => console.error(`Error creating user: ${error}`))
      .finally(() => setIsLoading(false));
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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {isLoading && (
          <Spinner
            style={{ display: "block", margin: "auto" }}
            label="Creating user..."
            size="large"
          />
        )}
        {!isLoading && (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              gap: "20px",
            }}
          >
            <div style={{ display: "flex", gap: "20px" }}>
              <div style={{ flex: 1 }}>
                <Label htmlFor="name">Name:</Label>
                <Input
                  type="text"
                  name="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
                {errors.Name && <p style={{ color: "red" }}>{errors.Name}</p>}
              </div>
              <div style={{ flex: 1 }}>
                <Label htmlFor="surname">Surname:</Label>
                <Input
                  type="text"
                  name="Surname"
                  value={formData.Surname}
                  onChange={handleChange}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
                {errors.Surname && (
                  <p style={{ color: "red" }}>{errors.Surname}</p>
                )}
              </div>
            </div>

            <div style={{ display: "flex", gap: "20px" }}>
              <div style={{ flex: 1 }}>
                <Label htmlFor="userType">User Type:</Label>
                <Input
                  type="text"
                  name="UserType"
                  value={formData.UserType}
                  onChange={handleChange}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
                {errors.UserType && (
                  <p style={{ color: "red" }}>{errors.UserType}</p>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <Label htmlFor="date">Created Date:</Label>
                <Input
                  type="date"
                  name="CreatedDate"
                  value={formData.CreatedDate}
                  onChange={handleChange}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
                {errors.CreatedDate && (
                  <p style={{ color: "red" }}>{errors.CreatedDate}</p>
                )}
              </div>
            </div>

            <div style={{ display: "flex", gap: "20px" }}>
              <div style={{ flex: 1 }}>
                <Label htmlFor="city">City:</Label>
                <Input
                  type="text"
                  name="City"
                  value={formData.City}
                  onChange={handleChange}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
                {errors.City && <p style={{ color: "red" }}>{errors.City}</p>}
              </div>
              <div style={{ flex: 1 }}>
                <Label htmlFor="address">Address:</Label>
                <Input
                  type="text"
                  name="Address"
                  value={formData.Address}
                  onChange={handleChange}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
                {errors.Address && (
                  <p style={{ color: "red" }}>{errors.Address}</p>
                )}
              </div>
            </div>

            <div
              style={{ display: "flex", gap: "10px", justifyContent: "center" }}
            >
              <Button
                type="submit"
                appearance="primary"
                // disabled={
                //   Object.values(formData).some((field) => !field) ||
                //   Object.keys(errors).length > 0
                // }
              >
                Submit
              </Button>
              <Button onClick={() => navigate("/")} appearance="secondary">
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
