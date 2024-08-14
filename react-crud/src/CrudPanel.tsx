import React from "react";
import { Button } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import DeleteUser from "./DeleteUser";
import ViewUserDialog from "./ViewUserDialog";
import { Data } from "./App";

type CrudPanelProps = {
  data: Data;
  usersArr: Data[];
  selectedItem: string | null;
  pregledIsOpen: boolean;
  fetchUsers: () => void;
  setData: (arr: Data[]) => void;
  onEditUser: (user: Data) => void;
  setSelectedItem: (selectedItem: string | null) => void;
};

const CrudPanel: React.FC<CrudPanelProps> = ({
  data,
  setSelectedItem,
  onEditUser,
  selectedItem,
  pregledIsOpen,
  fetchUsers,
  setData,
  usersArr,
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
          <DeleteUser
            users={data}
            fetchUsers={fetchUsers}
            setData={setData}
            usersArr={usersArr}
            setSelectedItem={setSelectedItem}
          ></DeleteUser>
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
          <ViewUserDialog data={data}></ViewUserDialog>
        )}
        <Button appearance="primary" onClick={() => navigate("create")}>
          Add User
        </Button>
      </div>
    </>
  );
};

export default CrudPanel;
