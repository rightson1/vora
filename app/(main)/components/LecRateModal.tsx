import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import User from "@/app/api/models/User";
import { useAuth } from "@/utils/AuthContext";

export default function LecRateModal({
  localStorageitem,
  title,
}: {
  localStorageitem: string;
  title: string;
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    localStorage.setItem(localStorageitem, "true");
    setOpen(false);
  };
  React.useEffect(() => {
    const rateLecNotification = localStorage.getItem(localStorageitem);
    if (rateLecNotification) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, []);
  const { user } = useAuth();
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Me,Rightson, The developer, am not in any way responsible for what you
          guys post here. And to guard you security and privacy,Anything posted
          here is annonymous .To comfirm this feel free to make use of the
          developer tools in your browser to inspect the network requests .Your
          name here is {user.fakeName}, dont reveal your identity to anyone
          So,if you have any issues with the content posted here,please contact
          me at
          <a href="mailto:chari.rightson@gmail.com">
            {" "}
            chari.rightson@gmail.com{" "}
          </a>
          . Goodbye
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus variant="contained">
          Okay,Totally Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
