import React from "react";
import { useTranslation } from "react-i18next";

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
    padding: theme.spacing(2, 10, 6),
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
  const { t, i18n } = useTranslation();

  const modalTitle = t("users.modal_title");
  const modalContent = i18n.t("users.modal_content", { name: username });
  const buttonText = t("common.submit");

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
            {modalTitle}
          </h2>
          <p className={classes.text} id="transition-modal-description">
            {modalContent}
          </p>
          <Button
            className={classes.deleteButton}
            size="large"
            variant="contained"
            color="primary"
          >
            {buttonText}
          </Button>
        </div>
      </Fade>
    </Modal>
  );
};

export default UserModal;
