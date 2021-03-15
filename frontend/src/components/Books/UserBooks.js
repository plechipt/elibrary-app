import React from "react";
import { useQuery } from "@apollo/client";
import { BOOK_USER_LIST_QUERY } from "../Api/books";
import Book from "./Book";

const UserBooks = () => {
  let { data: usersBorrowings } = useQuery(BOOK_USER_LIST_QUERY);

  return (
    <div className="users-books-container">
      {usersBorrowings ? (
        <>
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
        </>
      ) : null}
    </div>
  );
};

export default UserBooks;
