import React, { useState, useEffect } from "react";
import { Button, Input, Label, Spinner } from "@fluentui/react-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

type UserData = {
  id: number;
  username: string;
  email: string;
};

export const UpdateUserForm: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [formData, setFormData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      setIsLoading(true);
      axios
        .get(`http://localhost:3000/person/${userId}`)
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
      .put(`http://localhost:3000/person/${userId}`, formData)
      .then(() =>
        console.log(
          `User updated: New username: ${JSON.stringify(
            formData.username
          )}, New email: ${JSON.stringify(formData.email)}`
        )
      )
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
          <Label htmlFor="username">Username:</Label>
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
          <br />
          <br />
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
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
