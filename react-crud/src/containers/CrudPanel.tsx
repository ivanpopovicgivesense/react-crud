import React from "react";
import { Button } from "@fluentui/react-components";
import DeleteUser from "../components/DeleteUser";
import ViewUserDialog from "../components/ViewUserDialog";
import { Data } from "../App";

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
  if (!data) {
    return null;
  }
  return (
    <>
      <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
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
      </div>
    </>
  );
};

export default CrudPanel;
