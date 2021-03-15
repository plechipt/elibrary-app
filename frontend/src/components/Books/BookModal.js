import React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

const PUBLIC_FOLDER = process.env.PUBLIC_URL;

const BookModal = ({
  isBorrowed,
  openModal,
  closeModal,
  title,
  author,
  numberOfPages,
  genre,
  imageName,
}) => {
  return (
    <Dialog
      open={openModal}
      onClose={closeModal}
      aria-labelledby="customized-dialog-title"
    >
      <DialogTitle onClose={closeModal}>
        <div className="modal-header">
          <span>{title}</span>
        </div>
      </DialogTitle>
      <DialogContent className="modal-content" dividers>
        <div className="modal-left-side">
          <img
            src={`${PUBLIC_FOLDER}/static/images/${imageName}`}
            className="modal-image"
            alt=""
          />
        </div>
        <div className="modal-right-side">
          <Typography className="modal-description-item">
            <b>Author:</b>
            <span>{author}</span>
          </Typography>
          <Typography className="modal-description-item">
            <b>Genre:</b>
            <span>{genre}</span>
          </Typography>
          <Typography className="modal-description-item">
            <b>Number of pages:</b>
            <span>{numberOfPages}</span>
          </Typography>
        </div>
      </DialogContent>
      <DialogActions>
        {isBorrowed ? (
          <Button
            onClick={closeModal}
            className="blue-button"
            color="primary"
            variant="contained"
          >
            Return Book
          </Button>
        ) : (
          <Button
            onClick={closeModal}
            className="blue-button"
            color="primary"
            variant="contained"
          >
            Borrow Book
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default BookModal;
