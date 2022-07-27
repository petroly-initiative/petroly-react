import { gql } from "@apollo/client";

export const updateTrackingListMutation = gql`
  mutation UpdateTrackingList($courses: [CourseInput!]!) {
    updateTrackingList(courses: $courses)
  }
`;

export const updateTrackingListChannelsMutation = gql`
  mutation UpdateTrackingListChannels(
    $TELEGRAM: Boolean!
    $EMAIL: Boolean!
    $telegramId: Int
  ) {
    updateTrackingListChannels(
      input: {
        channels: { TELEGRAM: $TELEGRAM, EMAIL: $EMAIL }
        telegramId: $telegramId
      }
    )
  }
`;
