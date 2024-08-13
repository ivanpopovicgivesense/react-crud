import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogTrigger,
  DialogSurface,
  DialogBody,
} from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";

type Data = {
  id: string;
  Name: string;
  Surname: string;
  UserType: string;
  CreatedDate: string;
  City: string;
  Address: string;
};

type ViewUserProps = {
  data: Data;
  onDeleteUser: (id: string) => void;
  setSelectedItem: (selectedItem: string | null) => void;
  onEditUser: (user: Data) => void;
  selectedItem: string | null;
  pregledIsOpen: boolean;
};

const ViewUser: React.FC<ViewUserProps> = ({
  data,
  onDeleteUser,
  setSelectedItem,
  onEditUser,
  selectedItem,
  pregledIsOpen,
}) => {
  const navigate = useNavigate();
  if (!data) {
    return null;
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "8px",
        }}
      >
        {selectedItem !== null && pregledIsOpen && (
          <Button appearance="secondary" onClick={() => setSelectedItem(null)}>
            Cancel
          </Button>
        )}

        {selectedItem !== null && pregledIsOpen && (
          <Dialog>
            <DialogTrigger disableButtonEnhancement>
              <Button style={{ backgroundColor: "#E50000", color: "#FFF" }}>
                Delete
              </Button>
            </DialogTrigger>
            <DialogSurface>
              <DialogBody>
                <DialogTitle>
                  Delete {data.Name} {data.Surname} (ID: {data.id})
                </DialogTitle>
                <DialogContent>
                  Are you sure you want to delete this user?
                </DialogContent>
                <DialogActions>
                  <Button
                    style={{ backgroundColor: "#228B22", color: "#FFF" }}
                    onClick={() => {
                      onDeleteUser(data.id);
                      setSelectedItem(null);
                    }}
                  >
                    Yes
                  </Button>
                  <DialogTrigger disableButtonEnhancement>
                    <Button appearance="secondary">No</Button>
                  </DialogTrigger>
                </DialogActions>
              </DialogBody>
            </DialogSurface>
          </Dialog>
        )}

        {selectedItem !== null && pregledIsOpen && (
          <Button
            style={{ backgroundColor: "#FFAC1C" }}
            appearance="primary"
            onClick={() => onEditUser(data)}
          >
            Update
          </Button>
        )}

        {selectedItem !== null && pregledIsOpen && (
          <Dialog modalType="alert">
            <DialogTrigger>
              <Button
                style={{ backgroundColor: "#228B22" }}
                appearance="primary"
              >
                View
              </Button>
            </DialogTrigger>
            <DialogSurface>
              <DialogBody>
                <DialogTitle>User Information</DialogTitle>
                <DialogContent>
                  <h3>ID: {data.id}</h3>
                  <h3>Name: {data.Name}</h3>
                  <h3>Surname: {data.Surname}</h3>
                  <h3>User Type: {data.UserType}</h3>
                  <h3>Created Date: {data.CreatedDate}</h3>
                  <h3>City: {data.City}</h3>
                  <h3>Address: {data.Address}</h3>
                </DialogContent>
                <DialogActions>
                  <DialogTrigger>
                    <Button appearance="secondary">Close</Button>
                  </DialogTrigger>
                </DialogActions>
              </DialogBody>
            </DialogSurface>
          </Dialog>
        )}
        <Button appearance="primary" onClick={() => navigate("create")}>
          Add User
        </Button>
      </div>
    </>
  );
};

export default ViewUser;
