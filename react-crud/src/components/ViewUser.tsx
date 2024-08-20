import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogTrigger,
  DialogSurface,
  DialogBody,
} from "@fluentui/react-components";
import { Data } from "../App";
import {
  ReadingModeMobileFilled,
  ArrowExitFilled,
} from "@fluentui/react-icons";

type ViewUserDialogueProps = {
  data: Data;
};

const ViewUserDialog: React.FC<ViewUserDialogueProps> = ({ data }) => {
  return (
    <Dialog modalType="alert">
      <DialogTrigger>
        <ReadingModeMobileFilled
          style={{ color: "#228B22", fontSize: "32px", cursor: "pointer" }}
        >
          View
        </ReadingModeMobileFilled>
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
              <ArrowExitFilled style={{ fontSize: "32px", cursor: "pointer" }}>
                Close
              </ArrowExitFilled>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default ViewUserDialog;
