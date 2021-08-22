import { gql } from "@apollo/client";

export const tokenAuth = gql`
  mutation getToken($username: String, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      success
      token
      refreshToken
      user {
        id
        username
        profile {
          profilePic
        }
      }
    }
  }
`;
