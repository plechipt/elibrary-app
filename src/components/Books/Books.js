import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { BOOK_NOT_BORROWED_BOOKS_QUERY } from "../Api/books";

import { LanguageContext } from "../Contexts/LanguageContext";
import { ShowCreateModalContext } from "../Contexts/ShowCreateModalContext";
import Book from "./Book";
import CreateBookModal from "./CreateBookModal";
import "./Books.css";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const Books = () => {
  const { languageSelected } = useContext(LanguageContext);
  const { showCreateModal, setShowCreateModal } = useContext(
    ShowCreateModalContext
  );

  const { data: notBorrowedBooks, loading } = useQuery(
    BOOK_NOT_BORROWED_BOOKS_QUERY
  );

  return (
    <div className="books-container">
      {notBorrowedBooks && loading === false ? (
        <Grid container>
          {notBorrowedBooks.notBorrowedBooks.length !== 0 ? (
            <>
              {notBorrowedBooks.notBorrowedBooks.map(
                ({ id, title, author, numberOfPages, genre, imageName }) => {
                  return (
                    <Book
                      isBorrowed={false}
                      key={id}
                      id={id}
                      title={title}
                      author={author}
                      numberOfPages={numberOfPages}
                      genre={genre}
                      imageName={imageName}
                    />
                  );
                }
              )}
              <CreateBookModal
                openModal={showCreateModal}
                closeModal={() => setShowCreateModal(false)}
              />
            </>
          ) : (
            <Typography className="text-container" variant="h2">
              {languageSelected === "czech"
                ? "Žádné dostupné knihy"
                : "No available books"}
            </Typography>
          )}
        </Grid>
      ) : null}
    </div>
  );
};

export default Books;
