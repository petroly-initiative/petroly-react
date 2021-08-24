import { gql } from "@apollo/client";

export const tokenAuthMutation = gql`
  mutation getToken($username: String, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      success
      token
      refreshToken
      errors
      user {
        id
        username
        verified
        profile {
          profilePic
        }
      }
    }
  }
`;


export const verifyTokenMutation = gql`
mutation VerifyToken($token:String!){
  verifyToken(
    token:$token
  ){
    success
    errors
    payload
  }
}
`;