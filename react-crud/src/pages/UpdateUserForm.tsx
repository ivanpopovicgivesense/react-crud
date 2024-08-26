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
          <Label htmlFor="name">Name:</Label>
          <Input
            type="text"
            name="ime"
            value={formData.ime || ""}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
          <br />
          <br />
          <Label htmlFor="surname">Surname:</Label>
          <Input
            type="text"
            name="prezime"
            value={formData.prezime || ""}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
          <br />
          <br />
          <Label htmlFor="userType">User Type:</Label>
          <Input
            type="text"
            name="tipKorisnika"
            value={formData.tipKorisnika || ""}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
          <br />
          <br />
          <Label htmlFor="date">Created Date:</Label>
          <Input
            type="date"
            name="datumRodjenja"
            value={formData.datumRodjenja || ""}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
          <br />
          <br />
          <Label htmlFor="city">City:</Label>
          <Input
            type="text"
            name="grad"
            value={formData.grad || ""}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
          <br />
          <br />
          <Label htmlFor="address">Address:</Label>
          <Input
            type="text"
            name="adresa"
            value={formData.adresa || ""}
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
