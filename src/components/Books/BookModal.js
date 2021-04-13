import React from "react";
import UserModal from "./UserModal";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

const BookModal = ({
  isBorrowed,
  openModal,
  closeModal,
  id,
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
          <span className="modal-title">{title}</span>
        </div>
      </DialogTitle>
      <UserModal
        isBorrowed={isBorrowed}
        closeModal={closeModal}
        id={id}
        title={title}
        author={author}
        numberOfPages={numberOfPages}
        genre={genre}
        imageName={imageName}
      />
    </Dialog>
  );
};

export default BookModal;
