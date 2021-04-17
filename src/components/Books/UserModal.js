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
import Typography from "@material-ui/core/Typography";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

const PUBLIC_FOLDER = process.env.PUBLIC_URL;

const UserModal = ({
  isBorrowed,
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

  const [titleEnglish, titleCzech] = title;
  const [authorEnglish, authorCzech] = author;
  const [genreEnglish, genreCzech] = title;

  const [borrowBook, { loading: borrowBookLoading }] = useMutation(
    BORROWING_BORROW_BOOK_MUTATION
  );

  const [returnBook, { loading: returnBookLoading }] = useMutation(
    BORROWING_RETURN_BOOK_MUTATION
  );

  const borrowBookFunction = async () => {
    const message =
      languageSelected === "czech"
        ? `Půjčil sis ${titleCzech} knihu`
        : `You have borrowed ${titleEnglish} book`;

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
        ? `Vrátil si ${titleCzech} knihu`
        : `You have borrowed ${titleEnglish} book`;

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
    <>
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
            <span>
              {languageSelected === "czech" ? authorCzech : authorEnglish}
            </span>
          </Typography>
          <Typography className="modal-description-item">
            <b>{languageSelected === "czech" ? "Žánr:" : "Genre: "}</b>
            <span>
              {languageSelected === "czech" ? genreCzech : genreEnglish}
            </span>
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
    </>
  );
};

export default UserModal;
