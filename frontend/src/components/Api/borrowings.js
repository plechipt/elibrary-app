import { gql } from "@apollo/client";

// Query
export const BORROWING_USER_LIST_QUERY = gql`
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

// Mutation
export const BORROWING_BORROW_BOOK_MUTATION = gql`
  mutation($id: ID!) {
    borrowBook(id: $id) {
      borrowing {
        id
      }
    }
  }
`;

export const BORROWING_RETURN_BOOK_MUTATION = gql`
  mutation($id: ID!) {
    returnBook(id: $id) {
      message
    }
  }
`;
