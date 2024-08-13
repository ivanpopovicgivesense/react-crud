import React from "react";
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
} from "@fluentui/react-components";

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
    return (
      <>
        <div style={{ display: "flex", justifyContent: "flex-end" }}></div>
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
      </>
    );
  }
);

export default PersonTable;
