import { gql } from "@apollo/client";

// -- Instructos' queries:
export const instructorsQuery = gql`
query Instructors($first: Int, $after: String, $department: DepartmentEnum, $name: String) {
  instructors(
    first: $first
    after: $after
    data: {name: $name, department: $department}
  ) {
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      cursor
      node {
        id
        pk
        name
        department
        overallFloat
        profilePic
        evaluationSetCount
      }
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
  query getInstructorDetail($id: GlobalID!) {
    instructor(id: $id) {
      id
      pk
      name
      department
      profilePic
      overall
      overallFloat
      gradingAvg
      personalityAvg
      teachingAvg
      evaluationSetCount
      evaluationSet {
        date
        pk
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
`;

export const getDepartments = gql`
  query getDepartments($short: Boolean) {
    departmentList(short: $short)
  }
`;

export const meQuery = gql`
  query Me {
    me {
      pk
      username
      email
      profile {
        pk
        profilePic
        language
        theme
      }
      evaluationSetCount
      ownedCommunitiesCount
    }
  }
`;

export const hasEvaluatedQuery = gql`
  query hasEvaluated($instructorId: ID!) {
    hasEvaluated(pk: $instructorId)
  }
`;

export const meEvaluationSetQuery = gql`
  query MyEvaluations {
    me {
      evaluationSet {
        pk
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
  }
`;
export const myCommunities = gql`
  query MyCommunities {
    me {
      ownedCommunities {
        pk
        name
        platform
        icon {
          url
        }
      }
    }
  }
`;

export const communityInteractionsQuery = gql`
  query CommunityInteractions($id: ID!) {
    communityInteractions(pk: $id) {
      liked
      reported
    }
  }
`;

// -- communities' queries:
export const getCommunity = gql`
  query getCommunityInfo($id: ID!) {
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
