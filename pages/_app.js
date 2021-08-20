import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from 'next/head';
import { userContext, userReducer } from "../state-management/user-state/userContext";
import { useReducer } from "react";
import { instructorContext, stackReducer } from "../state-management/instructors-state/instructorsContext";
import { ApolloProvider } from "@apollo/client";
import client from "../api/apollo-client";

/**
 *
 * @WARNING This file exists to only apply globals assets and context for all pages
 */
function MyApp({ Component, pageProps }) {

  const [userInfo, dispatchUsers] = useReducer(userReducer, {logged: false});
  const [instructorsInfo, dispatchInst] = useReducer(stackReducer, {stack: 0})
  return (
    <>
      <ApolloProvider client={client}>
        <userContext.Provider
          value={{
            status: userInfo,
            userDispatch: dispatchUsers,
          }}
        >
          <instructorContext.Provider
            value={{
              status: instructorsInfo,
              instructorsDispatch: dispatchInst,
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
          </instructorContext.Provider>
        </userContext.Provider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
