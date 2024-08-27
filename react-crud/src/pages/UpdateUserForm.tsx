import React from "react";
import { Button, Input, Label, Spinner } from "@fluentui/react-components";
import { useUpdateForm } from "../api/useUpdateForm";
import { useParams } from "react-router-dom";

export const UpdateUserForm: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
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
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
          <br />
          <br />
          <Label htmlFor="prezime">Surname:</Label>
          <Input
            type="text"
            name="Surname"
            value={formData.Surname || ""}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
          <br />
          <br />
          <Label htmlFor="tipKorisnika">User Type:</Label>
          <Input
            type="text"
            name="UserType"
            value={formData.UserType || ""}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
          <br />
          <br />
          <Label htmlFor="datumRodjenja">Created Date:</Label>
          <Input
            type="date"
            name="CreatedDate"
            value={formData.CreatedDate || ""}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
          <br />
          <br />
          <Label htmlFor="grad">City:</Label>
          <Input
            type="text"
            name="City"
            value={formData.City || ""}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
          <br />
          <br />
          <Label htmlFor="adresa">Address:</Label>
          <Input
            type="text"
            name="Address"
            value={formData.Address || ""}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
          <br />
          <br />
          <div style={{ display: "flex", gap: "20px" }}>
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
    </>
  );
};
