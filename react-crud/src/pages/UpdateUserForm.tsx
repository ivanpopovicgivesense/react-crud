import React from "react";
import { Button, Input, Label, Spinner } from "@fluentui/react-components";
import { useUpdateForm } from "../hooks/api/useUpdateForm";
import { useParams } from "react-router-dom";
import { useUpdateFormValidation } from "../hooks/validation/useUpdateFormValidation";

export const UpdateUserForm: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { touched, setTouched, errors, setErrors, validate } =
    useUpdateFormValidation();
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
            label="Loading user data..."
            size="large"
          />
        )}
        {!isLoading && formData && (
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              gap: "20px",
            }}
            onSubmit={handleSubmit}
          >
            <div style={{ display: "flex", gap: "20px" }}>
              <div style={{ flex: 1 }}>
                <Label htmlFor="name">Name:</Label>
                <Input
                  type="text"
                  name="Name"
                  value={formData.Name || ""}
                  onBlur={() => setTouched({ ...touched, Name: true })}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    });
                    setErrors(
                      validate({ ...formData, [e.target.name]: e.target.value })
                    );
                  }}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
                {errors.Name && touched.Name && (
                  <p style={{ color: "red" }}>{errors.Name}</p>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <Label htmlFor="surname">Surname:</Label>
                <Input
                  type="text"
                  name="Surname"
                  value={formData.Surname || ""}
                  onBlur={() => setTouched({ ...touched, Surname: true })}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    });
                    setErrors(
                      validate({ ...formData, [e.target.name]: e.target.value })
                    );
                  }}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
                {errors.Surname && touched.Surname && (
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
                  value={formData.UserType || ""}
                  onBlur={() => setTouched({ ...touched, UserType: true })}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    });
                    setErrors(
                      validate({ ...formData, [e.target.name]: e.target.value })
                    );
                  }}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
                {errors.UserType && touched.UserType && (
                  <p style={{ color: "red" }}>{errors.UserType}</p>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <Label htmlFor="date">Created Date:</Label>
                <Input
                  type="date"
                  name="CreatedDate"
                  value={formData.CreatedDate || ""}
                  onBlur={() => setTouched({ ...touched, CreatedDate: true })}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    });
                    setErrors(
                      validate({ ...formData, [e.target.name]: e.target.value })
                    );
                  }}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
                {errors.CreatedDate && touched.CreatedDate && (
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
                  value={formData.City || ""}
                  onBlur={() => setTouched({ ...touched, City: true })}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    });
                    setErrors(
                      validate({ ...formData, [e.target.name]: e.target.value })
                    );
                  }}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
                {errors.City && touched.City && (
                  <p style={{ color: "red" }}>{errors.City}</p>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <Label htmlFor="address">Address:</Label>
                <Input
                  type="text"
                  name="Address"
                  value={formData.Address || ""}
                  onBlur={() => setTouched({ ...touched, Address: true })}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    });
                    setErrors(
                      validate({ ...formData, [e.target.name]: e.target.value })
                    );
                  }}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
                {errors.Address && touched.Address && (
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
                disabled={!isFormChanged}
              >
                Update
              </Button>
              <Button onClick={() => navigate("/")} appearance="secondary">
                Cancel
              </Button>
            </div>
          </form>
        )}
        {error && <h2 style={{ color: "red" }}>{error.message}</h2>}
      </div>
    </div>
  );
};
