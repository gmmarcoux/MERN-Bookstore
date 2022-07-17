import { gql } from '@apollo/client';

//login
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

//add user
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

//save book
export const SAVE_BOOK = gql`
  mutation saveBook ($book: SavedBookInput!) {
      saveBook (book: $book) {
          username
          email
          bookCount
          savedBooks {
              authors
              description
              bookID
              image
              link
              title
          }
      }
    }
`;

//remove book
export const REMOVE_BOOK = gql`
  mutation removeBook ($bookId: String!) {
      removeBook (bookID: $bookID) {
          username
          email
          bookCount
          savedBooks {
              authors
              description
              bookID
              image
              link
              title
          }
      }
    }
`;