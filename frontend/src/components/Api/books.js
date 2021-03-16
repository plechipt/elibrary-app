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
