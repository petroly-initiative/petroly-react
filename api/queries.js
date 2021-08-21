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
  query getIds {
    instructors {
        data{
          id
        }
    }
  }
`;

export const getInstructorDetail = gql`
  query Instructor($id: Int) {
    instructor(where: { id: { equals: $id } }) {
      id
      name
      department
      profilePic
      overall
      overallFloat
      gradingAvg
      personalityAvg
      teachingAvg
      evaluationSet {
        count
        data {
          date
          id
          grading
          teaching
          personality
          course
          comment
        }
      }
    }
  }
`;

export const getDepartments =  gql`
  query getDepartments($short: Boolean){
    departmentList(short: $short)
  }
`;


