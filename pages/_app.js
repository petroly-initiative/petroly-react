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
import { USER, DEF_LANG } from "../constants";

/**
 *
 * @WARNING This file exists to only apply globals assets and context for all pages
 */

function MyApp({ Component, pageProps }) {
  const [user, dispatch] = useReducer(userReducer, {
    status: USER.LOGGED_OUT,
    token: "",
    lang: DEF_LANG,
  });

  return (
    <>
      <ApolloProvider client={client}>
        <UserContext.Provider
          value={{
            user: user,
            userDispatch: dispatch,
          }}
        >
          <Head>
            <title>Petroly</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
            />

            <link rel="shortcut icon" href="/favicon.png" />
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
