import { gql } from "@apollo/client";

export const instructorsQuery = gql`
query Instructors($limit: Int, $offset: Int, 
  $department: InstructorDepartmentEnum, $name: String){
  instructors(
    limit: $limit
    offset: $offset
    where: {
      department: $department
      name: {contains: $name}
    }
  ){
    count
    data{
      id
      name
      department
      overallFloat
      profilePic
      evaluationSet{
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

export const meQuery = gql`
  query ME {
    me {
      id
      username
      profile {
        profilePic
      }
    }
  }
`;

