import { gql } from "@apollo/client";

export const tokenAuthMutation = gql`
  mutation getToken($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
    success
    errors
    user{
      username
      verified
    }
    token{
      token
      payload{
        origIat
        exp
        username
      }
    }
    refreshToken{
      revoked
      created
      token
    }
   }
  }
`;

export const verifyTokenMutation = gql`
  mutation VerifyToken($token: String!) {
    verifyToken(token: $token) {
    success
    errors
    user{
      username
    }
   }
  }
`;

export const refreshTokenMutation = gql`
  mutation Refresh($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken, revokeRefreshToken:false) {
    success
    errors
		token{
      token
      payload{
        username
      }

  }
    refreshToken{
      created
      revoked
      expiresAt
      isExpired
    }
   }
  }
`;

export const revokeTokenMutation = gql`
  mutation Revoke($refreshToken: String!) {
    revokeToken(refreshToken: $refreshToken) {
    success
    errors
    refreshToken{
      revoked
    }
  }
 }
`;

export const registerMutation = gql`
  mutation Register(
    $email: String!
    $username: String!
    $password1: String!
    $password2: String!
  ) {
    register(
      email: $email
      username: $username
      password1: $password1
      password2: $password2
    ) {
      success
      errors
    }
  }
`;


export const sendPasswordResetEmailMutation = gql`
  mutation ($email: String!) {
    sendPasswordResetEmail(email: $email) {
      success
      errors
    }
  }
`;

export const passwordResetMutation = gql`
  mutation ($token: String!, $newPassword1: String!, $newPassword2: String!) {
    passwordReset(
      token: $token
      newPassword1: $newPassword1
      newPassword2: $newPassword2
    ) {
      success
      errors
    }
  }
`;

export const verifyAccountMutation = gql`
  mutation ($token: String!) {
    verifyAccount(token: $token) {
      success
      errors
    }
  }
`;




export const evaluationCreateMutation = gql`
  mutation EvaluationCreate(
    $user: ID!
    $instructorId: ID!
    $grading: Int!
    $teaching: Int!
    $personality: Int!
    $gradingComment: String
    $teachingComment: String
    $personalityComment: String
    $course: String
    $comment: String
    $term: Int!
  ) {
    evaluationCreate(
      data: {
        user: $user
        instructor: $instructorId
        grading: $grading
        teaching: $teaching
        personality: $personality
        gradingComment: $gradingComment
        teachingComment: $teachingComment
        personalityComment: $personalityComment
        course: $course
        comment: $comment
        term: $term
      }
    ) {
      ... on OperationInfo {
        messages {
          field
          kind
          message
        }
      }

      ... on EvaluationType {
        pk
      }
    }
  }
`;

export const evaluationUpdateMutation = gql`
  mutation EvaluationUpdate(
    $id: ID!
    $grading: Int
    $teaching: Int
    $personality: Int
    $gradingComment: String
    $teachingComment: String
    $personalityComment: String
    $course: String
    $term: Int
    $comment: String
  ) {
    evaluationUpdate(
      data: {
        pk: $id
        grading: $grading
        teaching: $teaching
        personality: $personality
        gradingComment: $gradingComment
        teachingComment: $teachingComment
        personalityComment: $personalityComment
        course: $course
        term: $term
        comment: $comment
      }
    ) {
      ... on OperationInfo {
        messages {
          kind
          field
          message
        }
      }
      ... on EvaluationType {
        pk
      }
    }
  }
`;

// Community mutations:
export const createCommunnityMutation = gql`
  mutation CreateCommunity(
    $owner: ID!
    $name: String!
    $link: String!
    $platform: PlatformEnum
    $category: CategoryEnum
    $description: String!
    $section: String
    $file: Upload
  ) {
    communityCreate(
      data: {
        owner: $owner
        name: $name
        link: $link
        platform: $platform
        category: $category
        description: $description
        section: $section
        icon: $file
      }
    ) {
      ... on CommunityType {
        pk
      }
      ... on OperationInfo {
        messages {
          kind
          field
          message
        }
      }
    }
  }
`;

export const toggleLikeCommunityMutation = gql`
  mutation ToggleLikeCommunity($id: ID!) {
    toggleLikeCommunity(pk: $id)
  }
`;

export const deleteCommunity = gql`
  mutation DeleteCommunity($id: ID) {
    communityDelete(data: { pk: $id }) {
      ... on CommunityType {
        pk
      }
      ... on OperationInfo {
        messages {
          kind
          message
          field
        }
      }
    }
  }
`;

export const editCommunnityMutation = gql`
  mutation EditCompetition(
    $id: ID
    $name: String
    $link: String
    $platform: PlatformEnum
    $category: CategoryEnum
    $description: String
    $section: String
    $file: Upload
  ) {
    communityUpdate(
      data: {
        pk: $id
        name: $name
        link: $link
        platform: $platform
        category: $category
        description: $description
        section: $section
        icon: $file
      }
    ) {
      ... on CommunityType {
        pk
        name
      }
      ... on OperationInfo {
        messages {
          kind
          field
          message
        }
      }
    }
  }
`;

export const quickAddGroups = gql`
  mutation QuickAddGroups($text: String!) {
    quickAdd(text: $text)
  }
`;

export const reportCreateMutation = gql`
  mutation CreateReport(
    $reason: ReasonEnum
    $CommunityID: ID!
    $otherReason: String = ""
  ) {
    reportCreate(
      data: { pk: $CommunityID, reason: $reason, otherReason: $otherReason }
    )
  }
`;

export const profileUpdateMutation = gql`
  mutation ProfileUpdateMutation($id: ID!, $lang: String, $theme: String) {
    profileUpdate(data: { pk: $id, language: $lang, theme: $theme }) {
      ... on OperationInfo {
        messages {
          message
          kind
          field
        }
      }
      ... on ProfileType {
        pk
      }
    }
  }
`;

export const profilePicUpdateMutation = gql`
  mutation ($file: Upload!) {
    profilePicUpdate(file: $file) {
      success
    }
  }
`;
