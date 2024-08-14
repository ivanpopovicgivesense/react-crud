import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogTrigger,
  DialogSurface,
  DialogBody,
} from "@fluentui/react-components";
import { Data } from "./App";

type ViewUserDialogueProps = {
  data: Data;
};

const ViewUserDialog: React.FC<ViewUserDialogueProps> = ({ data }) => {
  return (
    <Dialog modalType="alert">
      <DialogTrigger>
        <Button style={{ backgroundColor: "#228B22" }} appearance="primary">
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
  );
};

export default ViewUserDialog;
