// utils/graphql-test-utils.js

// Utility to match GraphQL mutation based on the operation name
export const hasOperationName = (req, operationName) => {
  const { body } = req;
  return (
    body.hasOwnProperty("operationName") && body.operationName === operationName
  );
};

// Alias query if operationName matches
export const aliasQuery = (req, operationName) => {
  if (hasOperationName(req, operationName)) {
    req.alias = `gql${operationName}Query`;
  }
};

// Alias mutation if operationName matches
export const aliasMutation = (req, operationName) => {
  if (hasOperationName(req, operationName)) {
    req.alias = `gql${operationName}Mutation`;
  }
};

export const TEST_ENDPOINT = () => {
  var endpoint;
  if (Cypress.env("NODE_ENV") === "test") {
    endpoint = "https://petroly-api.graphcdn.app";
  } else if (Cypress.env("NODE_ENV") === "dev") {
    endpoint = "http://localhost:8000/endpoint/";
  }

  return endpoint
}