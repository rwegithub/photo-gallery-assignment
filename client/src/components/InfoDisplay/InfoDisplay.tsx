import { Snackbar } from "@material-ui/core";
import React from "react";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { AppInfoType } from "../../constants/AppConatants";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface InfoDisplay {
  open: boolean;
  setOpen: any;
  severity: AppInfoType;
  infoMessage: string;
}
export default function InfoDisplay(props: InfoDisplay) {
  const { open, setOpen, severity, infoMessage } = props;

  const handleClose = (e: any) => {
    setOpen(false);
  };
  return (
    <div>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {infoMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
