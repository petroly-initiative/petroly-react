import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from 'next/head';
import { userContext, userReducer } from "../state-management/user-state/userContext";
import { useReducer } from "react";
// import client from "../api/apollo-client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useMutation
} from "@apollo/client";
import { verifyTokenMutation } from "../api/mutations";

/**
 *
 * @WARNING This file exists to only apply globals assets and context for all pages
 */



function MyApp({ Component, pageProps }) {
  console.log('_app.js');

  const [userInfo, dispatchUsers] = useReducer(userReducer, {logged: false});
  var token = '';

  if (typeof window !== 'undefined'){
    token = sessionStorage.getItem('token');
    token = token ? token : '';
    console.log('window loaded');
  }  
  
  const client = new ApolloClient({
      uri: 'http://localhost:8000/endpoint/',
      cache: new InMemoryCache(),
      headers: {
        Authorization: 'JWT ' + token,
      }
  });


  return (
    <>
      <ApolloProvider client={client}>
        <userContext.Provider
          value={{
            status: userInfo,
            userDispatch: dispatchUsers,
          }}
        >
          
            <Head>
              <title>Petroly</title>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
              />
            </Head>
            <Component {...pageProps} />
        </userContext.Provider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
