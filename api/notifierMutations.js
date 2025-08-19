import { gql } from "@apollo/client";

export const registerCourseMutation = gql`
  mutation RegisterCourseUpdate(
    $id: ID!
    $strategy: RegisterStrategyEnum
    $withAddCrn: String
    $withDropCrn: String
  ) {
    registerCourseUpdate(
      data: {
        id: $id
        strategy: $strategy
        withAddCrn: $withAddCrn
        withDropCrn: $withDropCrn
      }
    ) {
      kind
      message
      code
    }
  }
`;

export const updateTrackingListMutation = gql`
  mutation UpdateTrackingList($courses: [CourseInput!]!) {
    updateTrackingList(courses: $courses)
  }
`;

export const updateTrackingListChannelsMutation = gql`
  mutation UpdateTrackingListChannels(
    $TELEGRAM: Boolean!
    $telegramId: String
    $hash: String
    $dataCheckString: String
  ) {
    updateTrackingListChannels(
      data: {
        channels: { TELEGRAM: $TELEGRAM, EMAIL: false }
        telegramId: $telegramId
        hash: $hash
        dataCheckString: $dataCheckString
      }
    )
  }
`;

export const TOGGLE_REGISTER = gql`
  mutation ToggleRegister($crn: String!) {
    toggleRegisterCourse(crn: $crn)
  }
`;
