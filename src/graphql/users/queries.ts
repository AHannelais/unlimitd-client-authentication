import { gql } from '@apollo/client';

const CURRENT_USER = gql`
  query getCurrentUser {
    currentUser {
      id
      firstname
      lastname
      email
      role
      createdAt
      updatedAt
    }
  }
`;

const USERS_LIST = gql`
  query getUsersList {
    usersList {
      id
      firstname
      lastname
      email
    }
  }
`;

// eslint-disable-next-line import/prefer-default-export
export { CURRENT_USER, USERS_LIST };
