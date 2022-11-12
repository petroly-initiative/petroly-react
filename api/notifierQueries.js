import { gql } from "@apollo/client";

export const trackedCoursesQuery = gql`
  query TrackedCourses {
    trackedCourses
  }
`;

export const searchQuery = gql`
  query Search($term: String!, $department: String!, $title: String!) {
    search(term: $term, department: $department, title: $title)
  }
`;

export const termsQuery = gql`
  query Terms {
    terms {
      long
      short
    }
  }
`;

export const trackingListChannelsQuery = gql`
  query TrackingListChannels {
    trackingListChannels {
      TELEGRAM
      EMAIL
    }
  }
`;

export const getSubjects = gql`
  query GetSubjects($short: Boolean) {
    subjectList(short: $short)
  }
`;
