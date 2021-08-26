import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import {
  UserContext,
  userReducer,
} from "../state-management/user-state/UserContext";
import { useReducer } from "react";
import client from "../api/apollo-client";
import ClientMutator from "../components/ClientMutator";
import { ApolloProvider } from "@apollo/client";
import { USER } from "../constants";

/**
 *
 * @WARNING This file exists to only apply globals assets and context for all pages
 */

function MyApp({ Component, pageProps }) {
  console.log("_app.js");

  const [user, userDispatch] = useReducer(userReducer, 
      { status: USER.LOGGED_OUT, token: "" });

  return (
    <>
      <ApolloProvider client={client}>
        <UserContext.Provider
          value={{
            user: user,
            userDispatch: userDispatch,
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
        </UserContext.Provider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
