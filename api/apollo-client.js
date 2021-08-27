limport {
    ApolloClient,
    InMemoryCache,
  } from "@apollo/client";

// Setting up the apollo client

// Non-authorized clients
const client = new ApolloClient({
    uri: 'https://www.petroly.co/endpoint/',
    cache: new InMemoryCache(),
});

export default client;
