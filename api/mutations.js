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

export const refreshTokenMutation = gql`
mutation Refresh($refreshToken:String!){
  refreshToken(
    refreshToken:$refreshToken
  ){
    success
    errors
    refreshToken
    token
  }
}
`;

export const revokeTokenMutation = gql`
mutation Revoke($refreshToken:String!){
  revokeToken(
    refreshToken: $refreshToken
  ){
    success
    errors
    revoked
  }
}
`;