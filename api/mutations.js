import { gql } from "@apollo/client";

export const tokenAuthMutation = gql`
  mutation getToken($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      success
      errors
      obtainPayload {
        payload {
          username
          origIat
          exp
        }
        token
        refreshToken
        refreshExpiresIn
      }
    }
  }
`;

export const verifyTokenMutation = gql`
  mutation VerifyToken($token: String!) {
    verifyToken(token: $token) {
      success
      errors
      verifyPayload {
        payload {
          exp
          origIat
          username
        }
      }
    }
  }
`;

export const refreshTokenMutation = gql`
  mutation Refresh($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      success
      errors
      refreshPayload {
        token
        refreshToken
        refreshExpiresIn
        payload {
          exp
          origIat
          username
        }
      }
    }
  }
`;

export const revokeTokenMutation = gql`
  mutation Revoke($refreshToken: String!) {
    revokeToken(refreshToken: $refreshToken) {
      success
      errors
      revokePayload {
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
      token
      refreshToken
    }
  }
`;
export const evaluationCreateMutation = gql`
  mutation EvaluationCreate(
    $instructorId: ID
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
        instructor: { connect: { id: { exact: $instructorId } } }
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
    $id: ID
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
      where: { id: { exact: $id } }
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

export const verifyAccountMutation = gql`
  mutation ($token: String!) {
    verifyAccount(token: $token) {
      success
      errors
    }
  }
`;

// Community mutations:
export const createCommunnityMutation = gql`
  mutation CreateCommunity(
    $name: String!
    $link: String!
    $platform: CommunityPlatformEnum!
    $category: CommunityCategoryEnum!
    $description: String!
    $section: String
    $file: Upload
  ) {
    communityCreate(
      input: {
        name: $name
        link: $link
        platform: $platform
        category: $category
        description: $description
        section: $section
        icon: { upload: $file }
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

export const toggleLikeCommunityMutation = gql`
  mutation ToggleLikeCommunity($id: ID!) {
    toggleLikeCommunity(ID: $id) {
      ok
    }
  }
`;

export const deleteCommunity = gql`
  mutation DeleteCommunity($id: ID) {
    communityDelete(where: { id: { exact: $id } }) {
      ok
      errors {
        field
        messages
      }
    }
  }
`;

export const editCommunnityMutation = gql`
  mutation EditCompetition(
    $id: ID
    $name: String!
    $link: String!
    $platform: CommunityPlatformEnum!
    $category: CommunityCategoryEnum!
    $description: String!
    $section: String
    $file: Upload
  ) {
    communityUpdate(
      input: {
        name: $name
        link: $link
        platform: $platform
        category: $category
        description: $description
        section: $section
        icon: { upload: $file }
      }
      where: { id: { exact: $id } }
    ) {
      ok
      errors {
        field
        messages
      }
      result {
        id
        name
      }
    }
  }
`;
export const reportCreateMutation = gql`
  mutation CreateReport(
    $reason: ReportReasonEnum!
    $CommunityID: ID!
    $otherReason: String = ""
  ) {
    reportCreate(
      input: {
        reason: $reason
        community: { connect: { id: { exact: $CommunityID } } }
        otherReason: $otherReason
      }
    ) {
      ok
      errors {
        field
        messages
      }
      result {
        id
        community {
          name
        }
        reason
      }
    }
  }
`;

export const profileUpdateMutation = gql`
  mutation ProfileUpdateMutation($id: ID!, $lang: String, $theme: String) {
    profileUpdate(input: { pk: $id, language: $lang, theme: $theme }) {
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
