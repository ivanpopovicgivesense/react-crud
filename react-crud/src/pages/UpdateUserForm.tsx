import React from "react";
import { Button, Input, Label, Spinner } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useGetUser } from "../api/useGetUser";
import { useParams } from "react-router-dom";
import { useGetUsers } from "../api/useGetUsers";

export const UpdateUserForm: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { API_URL } = useGetUsers();
  const {
    isLoading,
    error,
    setIsLoading,
    setError,
    setFormData,
    formData,
    initFormData,
  } = useGetUser(userId);

  const navigate = useNavigate();

  const isFormValid = (): boolean => {
    return (
      initFormData?.Name !== formData?.Name ||
      initFormData?.Surname !== formData?.Surname ||
      initFormData?.Address !== formData?.Address ||
      initFormData?.CreatedDate !== formData?.CreatedDate ||
      initFormData?.UserType !== formData?.UserType ||
      initFormData?.City !== formData?.City
    );
  };

  const handleSubmit = () => {
    if (!formData || !userId) return;

    setIsLoading(true);
    axios
      .put(`${API_URL}/${userId}`, formData)
      .then(() => navigate("/"))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {isLoading && <Spinner label="Loading user data..." size="large" />}
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
            name="Name"
            value={formData.Name}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
          <br />
          <br />
          <Label htmlFor="surname">Surname:</Label>
          <Input
            type="text"
            name="Surname"
            value={formData.Surname}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
          <br />
          <br />
          <Label htmlFor="userType">User Type:</Label>
          <Input
            type="text"
            name="UserType"
            value={formData.UserType}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
          <br />
          <br />
          <Label htmlFor="date">Created Date:</Label>
          <Input
            type="date"
            name="CreatedDate"
            value={formData.CreatedDate}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
          <br />
          <br />
          <Label htmlFor="city">City:</Label>
          <Input
            type="text"
            name="City"
            value={formData.City}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
          <br />
          <br />
          <Label htmlFor="address">Address:</Label>
          <Input
            type="text"
            name="Address"
            value={formData.Address}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
          <br />
          <br />
          <div>
            <Button
              type="submit"
              appearance="primary"
              disabled={!isFormValid()}
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
