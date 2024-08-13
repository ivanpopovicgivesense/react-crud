import React, { useEffect, useState } from "react";
import {
  Dropdown,
  Option,
  Spinner,
  Button,
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  Input,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogTrigger,
  DialogSurface,
  DialogBody,
  Label,
} from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import "./App.css";
import axios from "axios";

type Data = {
  id: string;
  Name: string;
  Surname: string;
  UserType: string;
  CreatedDate: string;
  City: string;
  Address: string;
};

type Error = {
  message: string;
  status?: number;
};

const MyComponent: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [pregledIsOpen, setPregledIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [noResults, setNoResults] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<null | string>(null);
  const [error, setError] = useState<Error | null>(null);
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

  const deleteUser = (id: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete user with an id of ${id}?`
      )
    ) {
      axios
        .delete(`http://localhost:3000/person/${id}`)
        .then(() => {
          setData(data.filter((user) => user.id !== id));
          console.log(`User with an id of ${id} was successfully deleted!`);
        })
        .catch((error) => console.error(`Error deleting user: ${error}`))
        .finally(() => fetchUsers());
    }
  };

  return (
    <>
      {isLoading && (
        <Spinner style={{ marginTop: "300px" }} label="Fetching users..." />
      )}
      {!isLoading && !error && (
        <>
          <FilterByUserType
            data={data}
            selectedUserType={selectedUserType}
            onChange={handleUserTypeChange}
          ></FilterByUserType>
          <SearchFilter
            value={criteria}
            onChange={handleSetCriteria}
          ></SearchFilter>
          {noResults && (
            <div style={{ textAlign: "center", margin: "20px 0" }}>
              <h2>User not found!</h2>
            </div>
          )}
          {selectedItem !== null && pregledIsOpen && (
            <ViewUser
              data={
                data.find((item) => item.id === selectedItem) || ({} as Data)
              }
              onDeleteUser={() => deleteUser(selectedItem)}
              onEditUser={handleEditUser}
              setSelectedItem={setSelectedItem}
            />
          )}
          <PersonTable
            data={filteredData}
            selectedItem={selectedItem}
            onChangeSelectedItem={(item) => handleSetSelectedItem(item)}
          />
        </>
      )}
      {error && <ErrorMessage message={error} />}
    </>
  );
};

type PersonTableProps = {
  data: Data[];
  selectedItem: null | string;
  onChangeSelectedItem: (row: string) => void;
};

const PersonTable: React.FC<PersonTableProps> = React.memo(
  ({ data, selectedItem, onChangeSelectedItem }) => {
    const navigate = useNavigate();

    const handleCreateClick = () => {
      navigate("create");
    };
    return (
      <div style={{ maxWidth: "fit-content", margin: "auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            style={{ marginTop: "15px" }}
            appearance="primary"
            onClick={handleCreateClick}
          >
            Add User
          </Button>
        </div>
        <Table>
          <TableHeader style={{ fontSize: "20px" }}>
            <TableRow>
              <TableHeaderCell style={{ textAlign: "center" }}>
                <strong>ID</strong>
              </TableHeaderCell>
              <TableHeaderCell style={{ textAlign: "center" }}>
                <strong>Name</strong>
              </TableHeaderCell>
              <TableHeaderCell style={{ textAlign: "center" }}>
                <strong>Surname</strong>
              </TableHeaderCell>
              <TableHeaderCell style={{ textAlign: "center" }}>
                <strong>User Type</strong>
              </TableHeaderCell>
              <TableHeaderCell style={{ textAlign: "center" }}>
                <strong>Created Date</strong>
              </TableHeaderCell>
              <TableHeaderCell style={{ textAlign: "center" }}>
                <strong>City</strong>
              </TableHeaderCell>
              <TableHeaderCell style={{ textAlign: "center" }}>
                <strong>Address</strong>
              </TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map(
              ({ id, Name, Surname, UserType, CreatedDate, City, Address }) => (
                <TableRow
                  key={id}
                  onClick={() => onChangeSelectedItem(id)}
                  style={{
                    backgroundColor: id === selectedItem ? "#DDD" : "#FFF",
                  }}
                >
                  <TableCell key={id}>
                    <TableCellLayout>{id}</TableCellLayout>
                  </TableCell>
                  <TableCell key={id}>
                    <TableCellLayout>{Name}</TableCellLayout>
                  </TableCell>
                  <TableCell key={id}>
                    <TableCellLayout>{Surname}</TableCellLayout>
                  </TableCell>
                  <TableCell key={id}>
                    <TableCellLayout>{UserType}</TableCellLayout>
                  </TableCell>
                  <TableCell key={id}>
                    <TableCellLayout>{CreatedDate}</TableCellLayout>
                  </TableCell>
                  <TableCell key={id}>
                    <TableCellLayout>{City}</TableCellLayout>
                  </TableCell>
                  <TableCell key={id}>
                    <TableCellLayout>{Address}</TableCellLayout>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
    );
  }
);

export default MyComponent;

type ViewUserProps = {
  data: Data;
  onDeleteUser: (id: string) => void;
  setSelectedItem: (selectedItem: string | null) => void;
  onEditUser: (user: Data) => void;
};

const ViewUser: React.FC<ViewUserProps> = ({
  data,
  onDeleteUser,
  setSelectedItem,
  onEditUser,
}) => {
  if (!data) {
    return null;
  }
  return (
    <>
      <Table>
        <TableRow>
          <TableCell style={{ textAlign: "center" }}>
            <Button
              style={{ backgroundColor: "#E50000" }}
              appearance="primary"
              onClick={() => onDeleteUser(data.id)}
            >
              Delete
            </Button>
          </TableCell>
          <TableCell style={{ textAlign: "center" }}>
            <Button
              style={{ backgroundColor: "#FFAC1C" }}
              appearance="primary"
              onClick={() => onEditUser(data)}
            >
              Update
            </Button>
          </TableCell>

          <TableCell style={{ textAlign: "center" }}>
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
          </TableCell>
          <TableCell style={{ textAlign: "center" }}>
            <Button
              appearance="secondary"
              onClick={() => setSelectedItem(null)}
            >
              Cancel
            </Button>
          </TableCell>
        </TableRow>
      </Table>
    </>
  );
};

type SearchFilterProps = {
  onChange: (value: string) => void;
  value: string;
};

const SearchFilter: React.FC<SearchFilterProps> = ({ onChange, value }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search..."
        style={{ padding: "5px", margin: "25px 0px 25px 5px" }}
      ></Input>
    </div>
  );
};

type FilterByUserTypeProps = {
  data: Data[];
  selectedUserType: string;
  onChange: (value: string) => void;
};

const FilterByUserType: React.FC<FilterByUserTypeProps> = ({
  data,
  selectedUserType,
  onChange,
}) => {
  const userTypes = Array.from(new Set(data.map((item) => item.UserType)));

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <select
        onChange={(e) => onChange(e.target.value)}
        value={selectedUserType}
      >
        <option value="">All</option>
        {userTypes.map((userType) => (
          <option key={userType} value={userType}>
            {userType}
          </option>
        ))}
      </select>
    </div>
  );
};

type ErrorMessageProps = {
  message: string | Error;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  const errorMessage =
    typeof message === "string"
      ? message
      : message.status
      ? `${message.message} (Status: ${message.status})`
      : message.message;

  return (
    <div style={{ color: "#e50000", margin: "20px 0" }}>
      <h2>Error:</h2>
      <p>{errorMessage}</p>
    </div>
  );
};
