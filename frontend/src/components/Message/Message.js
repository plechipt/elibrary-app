import React from "react";
import "./Message.css";

import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";

const Message = () => {
  return (
    <Grid container className="message-container">
      <Grid item xs={11} sm={8} md={6} lg={4} xl={3}>
        <Collapse in={true}>
          <Alert
            severity="success"
            action={
              <IconButton aria-label="close" color="inherit" size="small">
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>Success</AlertTitle>
            You have borrowed 'name' book
          </Alert>
        </Collapse>
      </Grid>
    </Grid>
  );
};

export default Message;
