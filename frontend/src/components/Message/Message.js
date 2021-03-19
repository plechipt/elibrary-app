import React, { useContext } from "react";
import { MessageContext } from "../Contexts/MessageContext";
import { MessageContentContext } from "../Contexts/MessageContentContext";
import "./Message.css";

import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import { Alert, AlertTitle } from "@material-ui/lab";

const Message = () => {
  const { messageContent } = useContext(MessageContentContext);
  const { showMessage, setShowMessage } = useContext(MessageContext);

  return (
    <Grid container className="message-container">
      <Grid item xs={11} sm={8} md={6} lg={4} xl={3}>
        <Collapse in={showMessage}>
          <Alert
            severity="success"
            action={
              <IconButton
                onClick={() => setShowMessage(false)}
                aria-label="close"
                color="inherit"
                size="small"
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>Success</AlertTitle>
            {messageContent}
          </Alert>
        </Collapse>
      </Grid>
    </Grid>
  );
};

export default Message;
