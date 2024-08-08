import React, { useEffect, useState } from "react";
import {
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
} from "@fluentui/react-components";
import "./App.css";
import axios from "axios";

type Data = {
  Id: number;
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

const App: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<null | number>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setIsLoading(true);
    axios
      .get("http://localhost:3000/person")
      .then((response) => setData(response.data))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  };

  const handleSetSelectedItem = (item: number) => {
    setSelectedItem(item === selectedItem ? null : item);
  };
  return (
    <>
      <PersonTable
        data={data}
        selectedItem={selectedItem}
        onChangeSelectedItem={(item) => handleSetSelectedItem(item)}
      ></PersonTable>
    </>
  );
};

type PersonTableProps = {
  data: Data[];
  selectedItem: null | number;
  onChangeSelectedItem: (row: number) => void;
};

const PersonTable: React.FC<PersonTableProps> = ({
  data,
  selectedItem,
  onChangeSelectedItem,
}) => {
  return (
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
          ({ Id, Name, Surname, UserType, CreatedDate, City, Address }) => (
            <TableRow
              key={Id}
              onClick={() => onChangeSelectedItem(Id)}
              style={{ backgroundColor: Id === selectedItem ? "#DDD" : "#FFF" }}
            >
              <TableCell>
                <TableCellLayout>{Id}</TableCellLayout>
              </TableCell>
              <TableCell>
                <TableCellLayout>{Name}</TableCellLayout>
              </TableCell>
              <TableCell>
                <TableCellLayout>{Surname}</TableCellLayout>
              </TableCell>
              <TableCell>
                <TableCellLayout>{UserType}</TableCellLayout>
              </TableCell>
              <TableCell>
                <TableCellLayout>{CreatedDate}</TableCellLayout>
              </TableCell>
              <TableCell>
                <TableCellLayout>{City}</TableCellLayout>
              </TableCell>
              <TableCell>
                <TableCellLayout>{Address}</TableCellLayout>
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
};

export default App;
