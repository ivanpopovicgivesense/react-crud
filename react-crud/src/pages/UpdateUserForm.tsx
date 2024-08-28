import React from "react";
import { Button, Input, Label, Spinner } from "@fluentui/react-components";
import { useUpdateForm } from "../hooks/api/useUpdateForm";
import { useParams } from "react-router-dom";
import { useFormValidation } from "../hooks/api/validation/useFormValidation";

export const UpdateUserForm: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { touched, setTouched, errors, setErrors, validate } =
    useFormValidation();
  const {
    formData,
    isLoading,
    error,
    setFormData,
    isFormChanged,
    handleSubmit,
    navigate,
  } = useUpdateForm(userId);

  return (
    <>
      {isLoading && (
        <Spinner
          style={{ marginTop: "300px" }}
          label="Loading user data..."
          size="large"
        />
      )}
      {!isLoading && formData && (
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          onSubmit={handleSubmit}
        >
          <Label htmlFor="ime">Name:</Label>
          <Input
            type="text"
            name="Name"
            value={formData.Name || ""}
            onBlur={() => setTouched({ ...touched, Name: true })}
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.value });
              setErrors(
                validate({ ...formData, [e.target.name]: e.target.value })
              );
            }}
          />
          {errors.Name && touched.Name ? (
            <p style={{ color: "red" }}>{errors.Name}</p>
          ) : null}
          <br />
          <br />
          <Label htmlFor="prezime">Surname:</Label>
          <Input
            type="text"
            name="Surname"
            value={formData.Surname || ""}
            onBlur={() => setTouched({ ...touched, Surname: true })}
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.value });
              setErrors(
                validate({ ...formData, [e.target.name]: e.target.value })
              );
            }}
          />
          {errors.Surname && touched.Surname ? (
            <p style={{ color: "red" }}>{errors.Surname}</p>
          ) : null}
          <br />
          <br />
          <Label htmlFor="tipKorisnika">User Type:</Label>
          <Input
            type="text"
            name="UserType"
            value={formData.UserType || ""}
            onBlur={() => setTouched({ ...touched, UserType: true })}
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.value });
              setErrors(
                validate({ ...formData, [e.target.name]: e.target.value })
              );
            }}
          />
          {errors.UserType && touched.UserType ? (
            <p style={{ color: "red" }}>{errors.UserType}</p>
          ) : null}
          <br />
          <br />
          <Label htmlFor="datumRodjenja">Created Date:</Label>
          <Input
            type="date"
            name="CreatedDate"
            value={formData.CreatedDate || ""}
            onBlur={() => setTouched({ ...touched, CreatedDate: true })}
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.value });
              setErrors(
                validate({ ...formData, [e.target.name]: e.target.value })
              );
            }}
          />
          {errors.CreatedDate && touched.CreatedDate ? (
            <p style={{ color: "red" }}>{errors.CreatedDate}</p>
          ) : null}
          <br />
          <br />
          <Label htmlFor="grad">City:</Label>
          <Input
            type="text"
            name="City"
            value={formData.City || ""}
            onBlur={() => setTouched({ ...touched, City: true })}
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.value });
              setErrors(
                validate({ ...formData, [e.target.name]: e.target.value })
              );
            }}
          />
          {errors.City && touched.City ? (
            <p style={{ color: "red" }}>{errors.City}</p>
          ) : null}
          <br />
          <br />
          <Label htmlFor="adresa">Address:</Label>
          <Input
            type="text"
            name="Address"
            value={formData.Address || ""}
            onBlur={() => setTouched({ ...touched, Address: true })}
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.value });
              setErrors(
                validate({ ...formData, [e.target.name]: e.target.value })
              );
            }}
          />
          {errors.Address && touched.Address && !isFormChanged ? (
            <p style={{ color: "red" }}>{errors.Address}</p>
          ) : null}
          <br />
          <br />
          <div style={{ display: "flex", gap: "20px" }}>
            <Button type="submit" appearance="primary" disabled={isFormChanged}>
              Update
            </Button>
            <Button onClick={() => navigate("/")} appearance="secondary">
              Cancel
            </Button>
          </div>
        </form>
      )}
      {error && <h2 style={{ color: "red" }}>{error.message}</h2>}
    </>
  );
};
