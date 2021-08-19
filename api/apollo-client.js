import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
  } from "@apollo/client";

// Setting up the apollo client
const client = new ApolloClient({
    uri: 'http://localhost:8000/endpoint/',
    cache: new InMemoryCache()
});

export default client;