import React, { useState, useEffect } from "react";
import { Button, Input, Label, Spinner } from "@fluentui/react-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Data } from "./App";

export const UpdateUserForm: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [formData, setFormData] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const API_URL = "http://localhost:3000/person";

  useEffect(() => {
    if (userId) {
      setIsLoading(true);
      axios
        .get(`${API_URL}/${userId}`)
        .then((response) => setFormData(response.data))
        .catch((err) => setError(err.message))
        .finally(() => setIsLoading(false));
    }
  }, [userId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
            <Button type="submit" appearance="primary">
              Update
            </Button>
            <Button onClick={() => navigate("/")} appearance="secondary">
              Cancel
            </Button>
          </div>
        </form>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
};
