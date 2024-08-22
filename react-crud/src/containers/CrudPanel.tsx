import React from "react";
import DeleteUser from "../components/DeleteUser";
import ViewUser from "../components/ViewUser";
import { Data } from "../App";
import { DualScreenUpdateFilled as UpdateIcon } from "@fluentui/react-icons";
type CrudPanelProps = {
  data: Data;
  usersArr: Data[];
  selectedItem: string | null;
  pregledIsOpen: boolean;
  fetchUsers: () => void;
  setData: (usersArr: Data[]) => void;
  onEditUser: (user: Data) => void;
  setSelectedItem: (selectedItem: string | null) => void;
};

const CrudPanel: React.FC<CrudPanelProps> = ({
  data,
  setSelectedItem,
  onEditUser,
  selectedItem,
  pregledIsOpen,
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
          <DeleteUser
            users={data}
            setData={setData}
            usersArr={usersArr}
            setSelectedItem={setSelectedItem}
          ></DeleteUser>
        )}
        {selectedItem !== null && pregledIsOpen && (
          <UpdateIcon
            style={{ color: "#FFAC1C", fontSize: "32px", cursor: "pointer" }}
            onClick={() => onEditUser(data)}
          >
            Update
          </UpdateIcon>
        )}
        {selectedItem !== null && pregledIsOpen && (
          <ViewUser data={data}></ViewUser>
        )}
      </div>
    </>
  );
};

export default CrudPanel;
