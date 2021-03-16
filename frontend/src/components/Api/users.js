import { gql } from "@apollo/client";

//Query
export const USER_ME_QUERY = gql`
  query {
    me {
      username
    }
  }
`;
