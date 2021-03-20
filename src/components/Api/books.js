import { gql } from "@apollo/client";

//Query
export const BOOK_LIST_QUERY = gql`
  query {
    books {
      id
      title
      author
      numberOfPages
      genre
      imageName
    }
  }
`;

export const BOOK_NOT_BORROWED_BOOKS_QUERY = gql`
  query {
    notBorrowedBooks {
      id
      title
      author
      numberOfPages
      genre
      imageName
    }
  }
`;
