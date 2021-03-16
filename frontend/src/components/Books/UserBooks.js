import React from "react";
import { useQuery } from "@apollo/client";
import { BORROWING_USER_LIST_QUERY } from "../Api/borrowings";
import Book from "./Book";

import Grid from "@material-ui/core/Grid";

const UserBooks = () => {
  let { data: usersBorrowings, loading } = useQuery(BORROWING_USER_LIST_QUERY);

  return (
    <div className="books-container">
      {usersBorrowings && loading === false ? (
        <Grid container className="books-grid-container">
          {usersBorrowings.usersBorrowings.map(
            ({
              book: { id, title, author, numberOfPages, genre, imageName },
            }) => {
              return (
                <Book
                  isBorrowed={true}
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

export default UserBooks;
