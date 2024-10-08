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
import { DeleteFilled as DeleteIcon } from "@fluentui/react-icons";
import { useGetUsers } from "../hooks/api/useGetUsers";
import { useNavigate } from "react-router-dom";

type DeleteUserProps = {
  users: Data;
  usersArr: Data[];
  setData: (users: Data[]) => void;
  setSelectedItem: (selectedUser: string | null) => void;
};

const DeleteUser: React.FC<DeleteUserProps> = ({
  users,
  usersArr,
  setSelectedItem,
}) => {
  const { setData } = useGetUsers("http://localhost:3000/person");

  const navigate = useNavigate();

  const deleteUser = (id: string | null) => {
    axios
      .delete(`http://localhost:3000/person/${id}`)
      .then(() => {
        setData(usersArr.filter((user) => user.id !== id));
        console.log(`User with an id of ${id} was successfully deleted!`);
      })
      .catch((error) => console.error(`Error deleting user: ${error}`))
      .finally(() => navigate(0));
  };

  return (
    <>
      <Dialog>
        <DialogTrigger disableButtonEnhancement>
          <DeleteIcon
            style={{ color: "#E50000", cursor: "pointer", fontSize: "32px" }}
          >
            Delete
          </DeleteIcon>
        </DialogTrigger>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>
              Delete {users.Name} {users.Surname}
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
