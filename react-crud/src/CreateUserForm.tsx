import React, { useState } from "react";
import { Button, Input, Label, Spinner } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const CreateUserForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    Name: "",
    Surname: "",
    UserType: "",
    CreatedDate: "",
    City: "",
    Address: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post("http://localhost:3000/person/", formData)
      .then((response) =>
        console.log(`User created ${JSON.stringify(response.data)}`)
      )
      .then(() => navigate("/"))
      .catch((error) => console.error(`Error creating user: ${error}`))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {isLoading && <Spinner label="Creating user..." size="large" />}
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
              disabled={
                !formData.Name ||
                !formData.Surname ||
                !formData.UserType ||
                !formData.City ||
                !formData.CreatedDate ||
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
