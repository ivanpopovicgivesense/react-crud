import React, { useEffect, useState } from "react";
import { Spinner } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import UserTable from "./components/UserTable";
import SearchFilter from "./components/SearchFilter";
import FilterByUserType from "./components/FilterByUserType";
import ErrorMessage from "./components/ErrorMessage";
import CrudPanel from "./containers/CrudPanel";
import NavigationBar from "./components/NavigationBar";
import { useGetUsers } from "./api/useGetUsers";
import { AddFilled } from "@fluentui/react-icons";

export type Data = {
  id: string;
  Name: string;
  Surname: string;
  UserType: string;
  CreatedDate: string;
  City: string;
  Address: string;
};

export type Error = {
  message: string;
  status?: number;
};

const MyComponent: React.FC = () => {
  const { data, setData, isLoading, error, fetchUsers } = useGetUsers();
  const [pregledIsOpen, setPregledIsOpen] = useState<boolean>(false);
  const [noResults, setNoResults] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<null | string>(null);
  const [criteria, setCriteria] = useState<string>("");
  const [selectedUserType, setSelectedUserType] = useState<string>("");

  const navigate = useNavigate();

  const filteredData = data.filter((item) => {
    const matchesName =
      criteria === "" ||
      item.Name.toLowerCase().startsWith(criteria.toLowerCase());
    const matchesUserType =
      selectedUserType === "" || item.UserType === selectedUserType;
    return matchesName && matchesUserType;
  });

  useEffect(() => {
    const noResultsCondition =
      filteredData.length === 0 && (criteria !== "" || selectedUserType !== "");
    setNoResults(noResultsCondition);
  }, [filteredData, selectedUserType, criteria]);

  const handleSetCriteria = (criteria: string) => {
    setCriteria(criteria);
  };

  const handleUserTypeChange = (value: string) => {
    setSelectedUserType(value);
  };

  const handleSetSelectedItem = (item: string) => {
    setSelectedItem(item === selectedItem ? null : item);
    setPregledIsOpen(true);
  };

  const handleEditUser = (user: Data) => {
    navigate(`/update/${user.id}`);
    setPregledIsOpen(false);
  };

  return (
    <>
      {isLoading && (
        <Spinner style={{ marginTop: "300px" }} label="Fetching users..." />
      )}
      {!isLoading && !error && (
        <>
          <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>
            <NavigationBar />
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <SearchFilter
                      value={criteria}
                      onChange={handleSetCriteria}
                    />
                    <FilterByUserType
                      data={data}
                      selectedUserType={selectedUserType}
                      onChange={handleUserTypeChange}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "10px",
                    }}
                  >
                    <CrudPanel
                      data={
                        data.find((item) => item.id === selectedItem) ||
                        ({} as Data)
                      }
                      onEditUser={handleEditUser}
                      setSelectedItem={setSelectedItem}
                      selectedItem={selectedItem}
                      pregledIsOpen={pregledIsOpen}
                      fetchUsers={fetchUsers}
                      usersArr={data}
                      setData={setData}
                    />
                    <AddFilled
                      style={{
                        cursor: "pointer",
                        fontSize: "32px",
                        color: "#2e95d4",
                      }}
                      onClick={() => navigate("create")}
                    >
                      Add User
                    </AddFilled>
                  </div>
                </div>
                <UserTable
                  data={filteredData}
                  selectedItem={selectedItem}
                  onChangeSelectedItem={handleSetSelectedItem}
                />
                {noResults && (
                  <div style={{ textAlign: "center", margin: "20px 0" }}>
                    <h2>User not found...</h2>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      {error && <ErrorMessage message={error} />}
    </>
  );
};

export default MyComponent;
