import { gql } from "@apollo/client";

// -- Instructos' queries:
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
      where: { department: $department, name: { icontains: $name } }
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

export const getEvaluatedInstructors = gql`
  query EvaluatedInstructors {
    evaluatedInstructors
  }
`;

export const getInstructorDetail = gql`
  query Instructor($id: ID) {
    instructor(where: { id: { exact: $id } }) {
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
          gradingComment
          teachingComment
          personalityComment
          course
          term
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
        id
        profilePic
        language
        theme
      }
      evaluationSet {
        count
      }
      ownedCommunities {
        count
      }
    }
  }
`;

export const hasEvaluatedQuery = gql`
  query hasEvaluated($instructorId: Int) {
    hasEvaluated(id: $instructorId)
  }
`;

export const meEvaluationSetQuery = gql`
  query MyEvaluations {
    me {
      evaluationSet {
        count
        data {
          id
          grading
          teaching
          personality
          course
          term
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
      ownedCommunities {
        count
      }
    }
  }
`;
export const myCommunities = gql`
  query MyCommunities {
    me {
      ownedCommunities {
        data {
          id
          name
          platform
          icon {
            url
          }
        }
      }
    }
  }
`;
// -- communities' queries:
export const getCommunity = gql`
query getCommunityInfo($id: ID) {
  community(pk: $id) {
    name
    platform
    category
    description
    section
    link
    icon {
      url
    }
  }
}
`;
export const CommunitiesQuery = gql`
query Communities(
  $name: String
  $category: CategoryEnum
  $platform: PlatformEnum
  $section: String
) {
  communities(
    filters: {
      name: { iContains: $name }
      category: $category
      platform: $platform
      section: { iContains: $section }
    }
  ) {
    pk
    date
    category
    description
    link
    name
    platform
    section
    verified
    likesCount
    icon {
      url
    }
  }
}
`; // Modify this query to handle filter feature
