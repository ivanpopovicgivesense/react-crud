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
import axios from "axios";
import { Data } from "../App";

type DeleteUserProps = {
  users: Data;
  usersArr: Data[];
  fetchUsers: () => void;
  setData: (users: Data[]) => void;
  setSelectedItem: (selectedUser: string | null) => void;
};

const DeleteUser: React.FC<DeleteUserProps> = ({
  users,
  usersArr,
  fetchUsers,
  setData,
  setSelectedItem,
}) => {
  const API_URL = "http://localhost:3000/person";

  const deleteUser = (id: string | null) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        setData(usersArr.filter((user) => user.id !== id));
        console.log(`User with an id of ${id} was successfully deleted!`);
      })
      .catch((error) => console.error(`Error deleting user: ${error}`))
      .finally(() => fetchUsers());
  };

  return (
    <>
      <Dialog>
        <DialogTrigger disableButtonEnhancement>
          <Button style={{ backgroundColor: "#E50000", color: "#FFF" }}>
            Delete
          </Button>
        </DialogTrigger>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>
              Delete {users.Name} {users.Surname} (ID: {users.id})
            </DialogTitle>
            <DialogContent>
              Are you sure you want to delete this user?
            </DialogContent>
            <DialogActions>
              <Button
                style={{ backgroundColor: "#228B22", color: "#FFF" }}
                onClick={() => {
                  deleteUser(users.id);
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
    </>
  );
};

export default DeleteUser;
