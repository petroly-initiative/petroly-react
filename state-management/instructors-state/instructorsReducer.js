/* We will create a reducer for changing the page of the instructors list and fetching the data
from the created API via respected methods*/

import client from "../../api/apollo-client";
import { instructorsQuery } from "../../api/queries";

export const instructorsReducer = (currentState, action) => {
  // !WARNING: This should be replaced by an API Call
  console.log('CurrentState:');

  const { data } = client.query({
    query: instructorsQuery
  })
  console.log(data);
  
  return currentState;
};
