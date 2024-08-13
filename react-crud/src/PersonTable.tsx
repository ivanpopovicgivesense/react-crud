import React from "react";
import {
  Button,
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
} from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import "./App.css";

type Data = {
  id: string;
  Name: string;
  Surname: string;
  UserType: string;
  CreatedDate: string;
  City: string;
  Address: string;
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

export default PersonTable;
