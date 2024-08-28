import React from "react";
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  Checkbox,
} from "@fluentui/react-components";
import { Data } from "../App";

type UserTableProps = {
  data: Data[];
  selectedItem: null | string;
  onChangeSelectedItem: (row: string) => void;
};

export const dateFormatter = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDay();

  return `${day}.${month}.${year}`;
};

const UserTable: React.FC<UserTableProps> = React.memo(
  ({ data, selectedItem, onChangeSelectedItem }) => {
    if (data.length === 0) {
      return (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <h2>User not found...</h2>
        </div>
      );
    }

    return (
      <div style={{ flex: 1, padding: "10px" }}>
        <Table>
          <TableHeader style={{ fontSize: "20px" }}>
            <TableRow>
              <TableHeaderCell
                style={{ fontSize: "16px", textAlign: "center" }}
              ></TableHeaderCell>
              <TableHeaderCell
                style={{ fontSize: "16px", textAlign: "center" }}
              >
                <strong>ID</strong>
              </TableHeaderCell>
              <TableHeaderCell
                style={{ fontSize: "16px", textAlign: "center" }}
              >
                <strong>Name</strong>
              </TableHeaderCell>
              <TableHeaderCell
                style={{ fontSize: "16px", textAlign: "center" }}
              >
                <strong>Surname</strong>
              </TableHeaderCell>
              <TableHeaderCell
                style={{ fontSize: "16px", textAlign: "center" }}
              >
                <strong>User type</strong>
              </TableHeaderCell>
              <TableHeaderCell
                style={{ fontSize: "16px", textAlign: "center" }}
              >
                <strong>Date of birth</strong>
              </TableHeaderCell>
              <TableHeaderCell
                style={{ fontSize: "16px", textAlign: "center" }}
              >
                <strong>City</strong>
              </TableHeaderCell>
              <TableHeaderCell
                style={{ fontSize: "16px", textAlign: "center" }}
              >
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
                  <TableCell>
                    <Checkbox checked={id === selectedItem} shape="circular" />
                  </TableCell>
                  <TableCell>
                    <TableCellLayout>{id}</TableCellLayout>
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
                    <TableCellLayout>
                      {dateFormatter(new Date(CreatedDate))}
                    </TableCellLayout>
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
      </div>
    );
  }
);

export default UserTable;
