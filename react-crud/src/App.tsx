import React, { useEffect, useState } from "react";
import { Button, Spinner } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserTable from "./UserTable";
import SearchFilter from "./SearchFilter";
import FilterByUserType from "./FilterByUserType";
import ErrorMessage from "./ErrorMessage";
import CrudPanel from "./CrudPanel";
import NavigationBar from "./NavigationBar";

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
  const [data, setData] = useState<Data[]>([]);
  const [pregledIsOpen, setPregledIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [noResults, setNoResults] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<null | string>(null);
  const [criteria, setCriteria] = useState<string>("");
  const [selectedUserType, setSelectedUserType] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);

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
    fetchUsers();
  }, []);

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
    console.log(`Navigating to /update/${user.id}`);
    navigate(`/update/${user.id}`);
    setPregledIsOpen(false);
  };

  const fetchUsers = () => {
    setIsLoading(true);
    axios
      .get("http://localhost:3000/person")
      .then((response) => setData(response.data))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {isLoading && (
        <Spinner style={{ marginTop: "300px" }} label="Fetching users..." />
      )}
      {!isLoading && !error && (
        <>
          <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
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
                    gap: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <SearchFilter value={criteria} onChange={handleSetCriteria} />
                  <FilterByUserType
                    data={data}
                    selectedUserType={selectedUserType}
                    onChange={handleUserTypeChange}
                  />

                  <Button
                    appearance="primary"
                    onClick={() => navigate("create")}
                  >
                    Add User
                  </Button>
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
