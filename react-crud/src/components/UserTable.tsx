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

export const dateFormatter = (date: Date | undefined) => {
  const year = new Date(date!).getFullYear();
  const month = new Date(date!).getMonth() + 1;
  const day = new Date(date!).getDate();

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
      <div
        style={{
          flex: 1,
          padding: "20px",
          borderRadius: "8px",
          background: "#ffffff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Table
          style={{
            borderCollapse: "collapse",
            width: "100%",
          }}
        >
          <TableHeader
            style={{
              fontSize: "18px",
              borderBottom: "2px solid #e0e0e0",
            }}
          >
            <TableRow>
              <TableHeaderCell
                style={{ textAlign: "center" }}
              ></TableHeaderCell>
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
                <strong>User type</strong>
              </TableHeaderCell>
              <TableHeaderCell style={{ textAlign: "center" }}>
                <strong>Date of birth</strong>
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
                    backgroundColor:
                      id === selectedItem ? "#e3f2fd" : "#ffffff",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f1f8e9")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      id === selectedItem ? "#e3f2fd" : "#ffffff")
                  }
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
                      {dateFormatter(CreatedDate)}
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
