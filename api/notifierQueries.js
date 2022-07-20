import { gql } from "@apollo/client";

export const trackedCoursesQuery = gql`
  query TrackedCourses {
    trackedCourses
  }
`;

export const searchQuery = gql`
  query Search($term: Int!, $department: String!, $title: String!) {
    search(term: $term, department: $department, title: $title)
  }
`;
