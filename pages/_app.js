import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from 'next/head';
import { userContext, userReducer } from "../state-management/user-state/userContext";
import { useReducer } from "react";
import client from "../api/apollo-client";
import ClientMutator from "../components/ClientMutator";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useMutation
} from "@apollo/client";
import { verifyTokenMutation } from "../api/mutations";
import ClientOnly from "../components/ClientOnly";
/**
 *
 * @WARNING This file exists to only apply globals assets and context for all pages
 */



function MyApp({ Component, pageProps }) {
  console.log('_app.js');

  const [userInfo, dispatchUser] = useReducer(userReducer, {logged: false});
  var token = '';

  if (typeof window !== 'undefined'){
    token = sessionStorage.getItem('token');
    token = token ? token : '';
    console.log('window loaded');
  }  

// context = {value: status, reducer: userDispatch}
  return (
    <>
      <ApolloProvider client={client}>
          <userContext.Provider
            value={{
              status: userInfo,
              userDispatch: dispatchUser,
            }}
          >
          <Head>
            <title>Petroly</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
            />
          </Head>
          <ClientMutator>
            <Component {...pageProps} />
          </ClientMutator>
          </userContext.Provider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
