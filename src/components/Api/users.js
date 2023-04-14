import { gql } from "@apollo/client";

// Queries
export const USER_ME_QUERY = gql`
  query {
    me {
      username
      isSuperuser
    }
  }
`;

export const USER_ALL_USERS_QUERY = gql`
  query ($page: Int) {
    allUsers(page: $page) {
      id
      username
    }
  }
`;

export const USER_ALL_USERS_COUNT_QUERY = gql`
  query {
    allUsersCount
  }
`;

// Mutations
export const USER_REGISTER_MUTATION = gql`
  mutation (
    $username: String!
    $email: String!
    $password1: String!
    $password2: String!
  ) {
    register(
      input: {
        username: $username
        email: $email
        password1: $password1
        password2: $password2
      }
    ) {
      user {
        username
      }
      errors {
        messages
        field
      }
    }
  }
`;

export const USER_LOGIN_MUTATION = gql`
  mutation ($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

export const USER_DELETE_TOKENS_MUTATION = gql`
  mutation {
    deleteTokenCookie {
      deleted
    }
    deleteRefreshTokenCookie {
      deleted
    }
  }
`;

export const USER_REFRESH_TOKEN_SILENTLY_MUTATION = gql`
  mutation {
    refreshToken {
      payload
    }
  }
`;

export const USER_MAKE_SUPERUSER_MUTATION = gql`
  mutation ($id: ID!) {
    makeSuperuser(id: $id) {
      message
    }
  }
`;
