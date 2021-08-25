import {
    ApolloClient,
    InMemoryCache,
  } from "@apollo/client";

// Setting up the apollo client

// Non-authorized clients
const client = new ApolloClient({
    uri: 'http://localhost:8000/endpoint/',
    cache: new InMemoryCache(),
});

export default client;