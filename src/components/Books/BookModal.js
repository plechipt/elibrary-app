import React, { useContext } from "react";
import { useMutation } from "@apollo/client";
import { MessageContext } from "../Contexts/MessageContext";
import { MessageContentContext } from "../Contexts/MessageContentContext";
import { LanguageContext } from "../Contexts/LanguageContext";
import { BOOK_NOT_BORROWED_BOOKS_QUERY } from "../Api/books";
import {
  BORROWING_USER_LIST_QUERY,
  BORROWING_BORROW_BOOK_MUTATION,
  BORROWING_RETURN_BOOK_MUTATION,
} from "../Api/borrowings";

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
  id,
  title,
  author,
  numberOfPages,
  genre,
  imageName,
}) => {
  const { setShowMessage } = useContext(MessageContext);
  const { setMessageContent } = useContext(MessageContentContext);
  const { languageSelected } = useContext(LanguageContext);

  const [borrowBook, { loading: borrowBookLoading }] = useMutation(
    BORROWING_BORROW_BOOK_MUTATION
  );
  const [returnBook, { loading: returnBookLoading }] = useMutation(
    BORROWING_RETURN_BOOK_MUTATION
  );

  const borrowBookFunction = async () => {
    const message =
      languageSelected === "czech"
        ? `Půjčil sis ${title} knihu`
        : `You have borrowed ${title} book`;

    await borrowBook({
      variables: { id },
      refetchQueries: [
        { query: BORROWING_USER_LIST_QUERY },
        { query: BOOK_NOT_BORROWED_BOOKS_QUERY },
      ],
    });
    closeModal();
    setShowMessage(true);
    setMessageContent(message);
  };

  const returnBookFunction = async () => {
    const message =
      languageSelected === "czech"
        ? `Vrátil si ${title} knihu`
        : `You have borrowed ${title} book`;

    await returnBook({
      variables: { id },
      refetchQueries: [
        { query: BORROWING_USER_LIST_QUERY },
        { query: BOOK_NOT_BORROWED_BOOKS_QUERY },
      ],
    });
    closeModal();
    setShowMessage(true);
    setMessageContent(message);
  };

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
            <b>{languageSelected === "czech" ? "Autor:" : "Author: "}</b>
            <span>{author}</span>
          </Typography>
          <Typography className="modal-description-item">
            <b>{languageSelected === "czech" ? "Žánr:" : "Genre: "}</b>
            <span>{genre}</span>
          </Typography>
          <Typography className="modal-description-item">
            <b>
              {languageSelected === "czech"
                ? "Počet stránek:"
                : "Number of pages:"}
            </b>
            <span>{numberOfPages}</span>
          </Typography>
        </div>
      </DialogContent>
      <DialogActions>
        {isBorrowed ? (
          <Button
            disabled={returnBookLoading}
            onClick={returnBookFunction}
            className="blue-button"
            color="primary"
            variant="contained"
          >
            {languageSelected === "czech" ? "Vrátit knihu" : "Return Book"}
          </Button>
        ) : (
          <Button
            disabled={borrowBookLoading}
            onClick={borrowBookFunction}
            className="blue-button"
            color="primary"
            variant="contained"
          >
            {languageSelected === "czech" ? "Půjčit knihu" : "Borrow Book"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default BookModal;
