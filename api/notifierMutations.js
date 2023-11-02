import { gql } from "@apollo/client";

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

export const toggleRegiter = gql`
  mutation ToggleRegiter($crn: String!) {
    toggleRegisterCourse(crn: $crn)
  }
`;
