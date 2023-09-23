import { gql } from '@apollo/client';

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      id
      title
      published
      author {
        name
        born
        bookCount
      }
      genres
    }
  }
`;
