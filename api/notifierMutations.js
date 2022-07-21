import { gql } from "@apollo/client";

export const updateTrackingListMutation = gql`
  mutation UpdateTrackingList($courses: [CourseInput!]!) {
    updateTrackingList(courses: $courses)
  }
`;
