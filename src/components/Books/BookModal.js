import React, { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { LanguageContext } from "../Contexts/LanguageContext";
import UserModal from "./UserModal";
import AdminModal from "./AdminModal";

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
  const { user } = useContext(UserContext);
  const { languageSelected } = useContext(LanguageContext);

  const [titleEnglish, titleCzech] = title;

  return (
    <Dialog
      open={openModal}
      onClose={closeModal}
      aria-labelledby="customized-dialog-title"
    >
      <DialogTitle onClose={closeModal}>
        <div className="modal-header">
          <span className="modal-title">
            {languageSelected === "czech" ? titleCzech : titleEnglish}
          </span>
        </div>
      </DialogTitle>
      {user.isSuperuser ? (
        <AdminModal
          author={author}
          genre={genre}
          numberOfPages={numberOfPages}
          imageName={imageName}
        />
      ) : (
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
      )}
    </Dialog>
  );
};

export default BookModal;
