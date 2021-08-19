import {gql} from "@apollo/client";

export const instructorsQuery = gql`
query {
  instructors(
    limit: 6
    offset: 0
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