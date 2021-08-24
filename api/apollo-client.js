import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
  } from "@apollo/client";

// Setting up the apollo client
var token = '';
if (typeof window !== 'undefined'){
  token = sessionStorage.getItem('token');
  console.log('window loaded');
}

// Non-authorized clients
const client = new ApolloClient({
    uri: 'http://localhost:8000/endpoint/',
    cache: new InMemoryCache(),
});

export default client;