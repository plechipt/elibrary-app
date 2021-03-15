import React from "react";
import { useQuery } from "@apollo/client";
import { BOOK_USER_LIST_QUERY } from "../Api/books";
import Book from "./Book";

const UserBooks = () => {
  let { data: usersBorrowings } = useQuery(BOOK_USER_LIST_QUERY);

  return (
    <>
      {usersBorrowings ? (
        <>
          {usersBorrowings.usersBorrowings.map(
            ({
              book: { id, title, author, numberOfPages, genre, imageName },
            }) => {
              return (
                <Book
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
        </>
      ) : null}
    </>
  );
};

export default UserBooks;
