import { gql } from "@apollo/client";

export const updateTrackingListMutation = gql`
  mutation UpdateTrackingList($courses: [CourseInput!]!) {
    updateTrackingList(courses: $courses)
  }
`;

export const updateTrackingListChannelsMutation = gql`
  mutation UpdateTrackingListChannels(

    $TELEGRAM: Boolean!,
    $telegramId: Int,
    $hash: String,
    $dataCheckString: String
  ) {
    updateTrackingListChannels(
      input: {
        channels: { TELEGRAM: $TELEGRAM, EMAIL: false }
        telegramId: $telegramId
        hash: $hash
        dataCheckString: $dataCheckString
      }
    )
  }
`;
