import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 10, 8),
  },
  text: {
    fontSize: "1rem",
  },
  deleteButton: {
    display: "flex",
    margin: "auto",
    marginTop: "1.5rem",
  },
}));

const UserModal = ({ username, modalIsOpen, closeModal }) => {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={modalIsOpen}
      onClose={closeModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={modalIsOpen}>
        <div className={classes.paper}>
          <h2 align="center" id="transition-modal-title">
            Are you sure
          </h2>
          <p className={classes.text} id="transition-modal-description">
            you want to make <b>{username}</b> special user?
          </p>
          <Button
            className={classes.deleteButton}
            size="large"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </div>
      </Fade>
    </Modal>
  );
};

export default UserModal;
