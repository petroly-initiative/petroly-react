import styles from "../styles/globals.scss";
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
import { USER, DEF_LANG, M, DEF_THEME } from "../constants";
import { useEffect } from "react";
import Navbar from "../components/utilities/navbar";
import { NavContext, NavReducer } from "../state-management/navbar-state/NavbarContext";
import Footer from "../components/utilities/footer";
import SSRProvider from "react-bootstrap/SSRProvider"
/**
 *
 * @WARNING This file exists to only apply globals assets and context for all pages
 */


if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  import("../mocks")
}


function MyApp({ Component, pageProps }) {



  const [user, dispatch] = useReducer(userReducer, {
    status: USER.LOGGED_OUT,
    token: "",
    lang: DEF_LANG,
    theme: DEF_THEME,
  });
  const [navState, navDispatch] = useReducer(NavReducer, {
    current: "home"
  })

  return (
    <>
      <SSRProvider>
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
            </Head>

            <ClientMutator>
              <NavContext.Provider
                value={{
                  navState: navState,
                  navDispatch: navDispatch,
                }}
              >
                <Navbar />
                <Component {...pageProps} />
              </NavContext.Provider>
              <Footer />
            </ClientMutator>
          </UserContext.Provider>
        </ApolloProvider>
        <style jsx global>{`
          body {
            background: ${user.theme === M.DARK
            ? "#121212;"
            : "rgb(250, 250, 250)"};
          }
        `}</style>
      </SSRProvider>
    </>
  );
}

export default MyApp;
