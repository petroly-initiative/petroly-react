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
  mutation VerifyToken($token: String!) {
    verifyToken(token: $token) {
      success
      errors
      payload
    }
  }
`;

export const refreshTokenMutation = gql`
  mutation Refresh($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      success
      errors
      refreshToken
      token
      payload
    }
  }
`;

export const revokeTokenMutation = gql`
  mutation Revoke($refreshToken: String!) {
    revokeToken(refreshToken: $refreshToken) {
      success
      errors
      revoked
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
      token
      refreshToken
    }
  }
`;
// FIXME: We need to change the mutation parameters to pass the comments
export const evaluationCreateMutation = gql`
  mutation EvaluationCreate(
    $instructorId: Int
    $username: String
    $grading: EvaluationGradingEnum!
    $teaching: EvaluationTeachingEnum!
    $personality: EvaluationPersonalityEnum!
    $gradingComment: String
    $teachingComment: String
    $personalityComment: String
    $course: String
    $comment: String
    $term: Int!
  ) {
    evaluationCreate(
      input: {
        instructor: { connect: { id: { equals: $instructorId } } }
        user: { connect: { username: { equals: $username } } }
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
      ok
      errors {
        field
        messages
      }
      result {
        id
      }
    }
  }
`;

export const evaluationUpdateMutation = gql`
  mutation EvaluationUpdate(
    $id: Int
    $grading: EvaluationGradingEnum
    $teaching: EvaluationTeachingEnum
    $personality: EvaluationPersonalityEnum
    $gradingComment: String
    $teachingComment: String
    $personalityComment: String
    $course: String
    $term: Int
    $comment: String
  ) {
    evaluationUpdate(
      where: { id: { equals: $id } }
      input: {
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
      ok
      errors {
        field
        messages
      }
      result {
        id
      }
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

// Community mutations:

// export const updateCommunityLikes = gql``; // TODO
export const createCommunnityMutation = gql`
  mutation CreateCommunity(
    $name: String!
    $link: String!
    $platform: CommunityPlatformEnum!
    $category: CommunityCategoryEnum!
    $description: String!
    $section: String
  ) {
    communityCreate(
      input: {
        name: $name
        link: $link
        platform: $platform
        category: $category
        description: $description
        section: $section
      }
    ) {
      ok
      errors {
        field
        messages
      }
      result {
        id
      }
    }
  }
`;
