import { gql } from "@apollo/client";

// Queries
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
      genre
      titleCz
      authorCz
      genreCz
      numberOfPages
      imageName
    }
  }
`;

// Mutations
export const BOOK_DELETE_BOOK_MUTATION = gql`
  mutation ($id: ID!) {
    deleteBook(id: $id) {
      message
    }
  }
`;
