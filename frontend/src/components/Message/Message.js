import React from "react";

import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

const Message = () => {
  return (
    <Alert severity="success">
      <AlertTitle>Success</AlertTitle>
      This is a success alert — <strong>check it out!</strong>
    </Alert>
  );
};

export default Message;
