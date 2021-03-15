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

export const BOOK_USER_LIST_QUERY = gql`
  query {
    usersBorrowings {
      id
      date
      user {
        username
      }
      book {
        id
        title
        author
        numberOfPages
        genre
        imageName
      }
    }
  }
`;
