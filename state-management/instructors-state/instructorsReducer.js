/* We will create a reducer for changing the page of the instructors list and fetching the data
from the created API via respected methods*/

import mockData from "../../dummy-data/instructors-data.json";
export const instructorsReducer = (currentState, action) => {
  // !WARNING: This should be replaced by an API Call
  const newData =  mockData[action.index];
  return newData;
};
