import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from 'next/head';
import { userContext, userReducer } from "../state-management/user-state/userContext";
import { useReducer } from "react";

import { ApolloProvider } from "@apollo/client";
import client from "../api/apollo-client";

/**
 *
 * @WARNING This file exists to only apply globals assets and context for all pages
 */
function MyApp({ Component, pageProps }) {

  const [userInfo, dispatch] = useReducer(userReducer, {logged: false});
  return (
    <>
      <ApolloProvider client={client}>
        <userContext.Provider
          value={{
            status: userInfo,
            userDispatch: dispatch
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
