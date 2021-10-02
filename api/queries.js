import { gql } from "@apollo/client";

export const instructorsQuery = gql`
  query Instructors(
    $limit: Int
    $offset: Int
    $department: InstructorDepartmentEnum
    $name: String
  ) {
    instructors(
      limit: $limit
      offset: $offset
      where: { department: $department, name: { contains: $name } }
    ) {
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

export const getInstructorName = gql`
  query getIds {
    instructors {
      data {
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

export const getDepartments = gql`
  query getDepartments($short: Boolean) {
    departmentList(short: $short)
  }
`;

export const meQuery = gql`
  query Me {
    me {
      id
      username
      email
      profile {
        profilePic
      }
      evaluationSet {
        count
      }
    }
  }
`;

export const hasEvaluatedQuery = gql`
  query ($instructorId: Int) {
    hasEvaluated(id: $instructorId)
  }
`;

export const meEvaluationSetQuery = gql`
  query Me {
    me {
      evaluationSet {
        count
        data {
          id
          grading
          teaching
          personality
          course
          comment
          gradingComment
          teachingComment
          personalityComment
          instructor {
            name
            profilePic
            department
            overall
          }
        }
      }
    }
  }
`;
