import {
    ApolloClient,
    InMemoryCache,
  } from "@apollo/client";
import { URL_ENDPOINT } from "../constants";

// Setting up the apollo client

// Non-authorized clients
const client = new ApolloClient({
    URL_ENDPOINT,
    cache: new InMemoryCache(),
});

export default client;
