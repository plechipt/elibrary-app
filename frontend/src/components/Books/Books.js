import React from "react";
import { useQuery } from "@apollo/client";
import { BOOK_LIST_QUERY } from "../Api/books";
import Book from "./Book";
import "./Books.css";

import Grid from "@material-ui/core/Grid";

const Books = () => {
  const { data: books } = useQuery(BOOK_LIST_QUERY);

  return (
    <div className="books-container">
      {books ? (
        <Grid container>
          {books.books.map(
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
