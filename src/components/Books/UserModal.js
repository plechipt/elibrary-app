import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation } from "@apollo/client";
import { MessageContext } from "../Contexts/MessageContext";
import { MessageContentContext } from "../Contexts/MessageContentContext";
import {
  BOOK_NOT_BORROWED_BOOKS_QUERY,
  BOOK_NOT_BORROWED_BOOKS_COUNT_QUERY,
} from "../Api/books";
import {
  BORROWING_USER_LIST_QUERY,
  BORROWING_BORROW_BOOK_MUTATION,
  BORROWING_RETURN_BOOK_MUTATION,
  BORROWING_USER_LIST_COUNT_QUERY,
} from "../Api/borrowings";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

//const PUBLIC_FOLDER = process.env.PUBLIC_URL;
const BUCKET_URL = process.env.REACT_APP_BUCKET_URL;

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
  const { t, i18n } = useTranslation();
  const { setShowMessage } = useContext(MessageContext);
  const { setMessageContent } = useContext(MessageContentContext);

  const [titleEnglish, titleCzech] = title;
  const [authorEnglish, authorCzech] = author;
  const [genreEnglish, genreCzech] = genre;

  const { data: usersBorrowingsCount } = useQuery(
    BORROWING_USER_LIST_COUNT_QUERY
  );

  const [borrowBook, { loading: borrowBookLoading }] = useMutation(
    BORROWING_BORROW_BOOK_MUTATION
  );

  const [returnBook, { loading: returnBookLoading }] = useMutation(
    BORROWING_RETURN_BOOK_MUTATION
  );

  const borrowBookFunction = async () => {
    const titleName = i18n.language === "cs" ? titleCzech : titleEnglish;
    let message = i18n.t("books.borrow_message", { title: titleName });
    let errorMessage = "You have exceeded the limit borrowed books";

    const maximumBorrowedBooks = 3;
    const booksCount = usersBorrowingsCount.usersBorrowingsCount;

    if (booksCount >= maximumBorrowedBooks) {
      message = errorMessage;
    } else {
      await borrowBook({
        variables: { id },
        refetchQueries: [
          { query: BORROWING_USER_LIST_QUERY, variables: { page: 1 } },
          { query: BOOK_NOT_BORROWED_BOOKS_QUERY, variables: { page: 1 } },
          { query: BOOK_NOT_BORROWED_BOOKS_COUNT_QUERY },
          { query: BORROWING_USER_LIST_COUNT_QUERY },
        ],
      });
    }
    closeModal();
    setMessageContent(message);
    setShowMessage(true);
  };

  const returnBookFunction = async () => {
    const titleName = i18n.language === "cs" ? titleCzech : titleEnglish;
    const message = i18n.t("books.return_message", { title: titleName });

    await returnBook({
      variables: { id },
      refetchQueries: [
        { query: BORROWING_USER_LIST_QUERY, variables: { page: 1 } },
        { query: BOOK_NOT_BORROWED_BOOKS_QUERY, variables: { page: 1 } },
        { query: BOOK_NOT_BORROWED_BOOKS_COUNT_QUERY },
        { query: BORROWING_USER_LIST_COUNT_QUERY },
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
            src={`${BUCKET_URL}/static/images/${imageName}`}
            className="modal-image"
            alt=""
          />
        </div>
        <div className="modal-right-side">
          <Typography className="modal-description-item">
            <b>{t("books.author")}:</b>
            <span>{i18n.language === "cs" ? authorCzech : authorEnglish}</span>
          </Typography>
          <Typography className="modal-description-item">
            <b>{t("books.genre")}:</b>
            <span>{i18n.language === "cs" ? genreCzech : genreEnglish}</span>
          </Typography>
          <Typography className="modal-description-item">
            <b>{t("books.number_of_pages")}:</b>
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
            {t("books.return_book")}
          </Button>
        ) : (
          <Button
            disabled={borrowBookLoading}
            onClick={borrowBookFunction}
            className="blue-button"
            color="primary"
            variant="contained"
          >
            {t("books.borrow_book")}
          </Button>
        )}
      </DialogActions>
    </>
  );
};

export default UserModal;
