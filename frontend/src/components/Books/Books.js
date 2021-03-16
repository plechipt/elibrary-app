import React from "react";
import { useQuery } from "@apollo/client";
import { BOOK_NOT_BORROWED_BOOKS_QUERY } from "../Api/books";
import Book from "./Book";
import "./Books.css";

import Grid from "@material-ui/core/Grid";

const Books = () => {
  const { data: notBorrowedBooks, loading } = useQuery(
    BOOK_NOT_BORROWED_BOOKS_QUERY
  );

  return (
    <div className="books-container">
      {notBorrowedBooks && loading === false ? (
        <Grid container>
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
        </Grid>
      ) : null}
    </div>
  );
};

export default Books;
