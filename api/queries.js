import { gql } from "@apollo/client";

export const instructorsQuery = gql`
  query Instructors( $offset: Int) {
    instructors(limit: 18, offset: $offset) {
      count
      data {
        id
        name
        department
        overallFloat
        profilePic
        evaluationSet {
          count
        }
      }
    }
  }
`;

export const getInstructorName =  gql`
  query getNames {
    instructors {
      data {
        id
        name
      }
    }
  }
`;

export const getInstructorDetail = (id) => gql`
  query{
    instructor(where: { id: { equals: ${id} } }) {
      name
      department
      profilePic
      overallFloat
      gradingAvg
      personalityAvg
      teachingAvg
    }
  }
`;


