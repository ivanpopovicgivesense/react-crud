import React from "react";
import {
  Button,
  TableCell,
  TableRow,
  Table,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogTrigger,
  DialogSurface,
  DialogBody,
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

export default ViewUser;
