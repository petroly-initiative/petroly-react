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
    community(where: { id: { exact: $id } }) {
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
`; // TODO update this query to match the new model.
export const CommunitiesQuery = gql`
  query Communities(
    $name: String
    $category: CommunityCategoryEnum
    $platform: CommunityPlatformEnum
    $section: String
  ) {
    communities(
      where: {
        name: { icontains: $name }
        category: $category
        platform: $platform
        section: { contains: $section }
        archived: { exact: false }
      }
    ) {
      count
      data {
        id
        date
        category
        description
        link
        name
        platform
        section
        verified
        likes {
          count
        }
        reports {
          count
        }
        icon {
          url
        }
      }
    }
  }
`; // Modify this query to handle filter feature

export const userHasLiked = gql`
  query HasLikedCommunity($id: ID) {
    hasLikedCommunity(id: $id)
  }
`;
