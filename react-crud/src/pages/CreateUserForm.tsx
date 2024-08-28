import React, { useState } from "react";
import { Button, Input, Label, Spinner } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormValidation } from "../hooks/api/validation/useFormValidation";
import { FormValues } from "../hooks/api/validation/useFormValidation";

export const CreateUserForm: React.FC = () => {
  const { touched, setTouched, errors, setErrors, validate } =
    useFormValidation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <>
      {isLoading && (
        <Spinner
          style={{ marginTop: "300px" }}
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
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Label htmlFor="name">Name:</Label>
          <Input
            type="text"
            name="Name"
            value={formData.Name}
            onBlur={() => setTouched({ ...touched, Name: true })}
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.value });
              setErrors(
                validate({ ...formData, [e.target.name]: e.target.value })
              );
            }}
          />
          {errors.Name && touched.Name && (
            <p style={{ color: "red" }}>{errors.Name}</p>
          )}
          <br />
          <br />
          <Label htmlFor="surname">Surname:</Label>
          <Input
            type="text"
            name="Surname"
            value={formData.Surname}
            onBlur={() => setTouched({ ...touched, Surname: true })}
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.value });
              setErrors(
                validate({ ...formData, [e.target.name]: e.target.value })
              );
            }}
          />
          {errors.Surname && touched.Surname && (
            <p style={{ color: "red" }}>{errors.Surname}</p>
          )}
          <br />
          <br />
          <Label htmlFor="userType">User Type:</Label>
          <Input
            type="text"
            name="UserType"
            value={formData.UserType}
            onBlur={() => setTouched({ ...touched, UserType: true })}
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.value });
              setErrors(
                validate({ ...formData, [e.target.name]: e.target.value })
              );
            }}
          />
          {errors.UserType && touched.UserType && (
            <p style={{ color: "red" }}>{errors.UserType}</p>
          )}
          <br />
          <br />
          <Label htmlFor="date">Created Date:</Label>
          <Input
            type="date"
            name="CreatedDate"
            value={formData.CreatedDate}
            onBlur={() => setTouched({ ...touched, CreatedDate: true })}
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.value });
              setErrors(
                validate({ ...formData, [e.target.name]: e.target.value })
              );
            }}
          />
          {errors.CreatedDate && touched.CreatedDate && (
            <p style={{ color: "red" }}>{errors.CreatedDate}</p>
          )}
          <br />
          <br />
          <Label htmlFor="city">City:</Label>
          <Input
            type="text"
            name="City"
            value={formData.City}
            onBlur={() => setTouched({ ...touched, City: true })}
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.value });
              setErrors(
                validate({ ...formData, [e.target.name]: e.target.value })
              );
            }}
          />
          {errors.City && touched.City && (
            <p style={{ color: "red" }}>{errors.City}</p>
          )}
          <br />
          <br />
          <Label htmlFor="address">Address:</Label>
          <Input
            type="text"
            name="Address"
            value={formData.Address}
            onBlur={() => setTouched({ ...touched, Address: true })}
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.value });
              setErrors(
                validate({ ...formData, [e.target.name]: e.target.value })
              );
            }}
          />
          {errors.Address && touched.Address && (
            <p style={{ color: "red" }}>{errors.Address}</p>
          )}
          <br />
          <br />
          <div style={{ display: "flex", gap: "20px" }}>
            <Button
              type="submit"
              appearance="primary"
              disabled={
                !formData.Name ||
                !formData.Surname ||
                !formData.UserType ||
                !formData.CreatedDate ||
                !formData.City ||
                !formData.Address
              }
            >
              Submit
            </Button>
            <Button onClick={() => navigate("/")} appearance="secondary">
              Cancel
            </Button>
          </div>
        </form>
      )}
    </>
  );
};
