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
import Navbar from "../components/utilities/navbar";
import {
  NavContext,
  NavReducer,
} from "../state-management/navbar-state/NavbarContext";
import Footer from "../components/utilities/footer";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  import("../mocks");
}

function MaintenancePage() {
  return (
    <>
      <Head>
        <title>Petroly - Project Discontinued</title>
      </Head>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "20px",
          textAlign: "center",
          backgroundColor: "#f5f5f5",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: "600px",
            padding: "40px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              marginBottom: "20px",
              color: "#333",
            }}
          >
            Project Discontinued
          </h1>
          <p
            style={{
              fontSize: "1.2rem",
              color: "#666",
              lineHeight: "1.6",
            }}
          >
            We stopped the project for losing interest.
          </p>
          <p
            style={{
              fontSize: "1rem",
              color: "#999",
              marginTop: "20px",
            }}
          >
            Thank you for your support.
          </p>
        </div>
      </div>
    </>
  );
}

function MyApp({ Component, pageProps }) {
  // Show maintenance page
  const isProjectDiscontinued = true;

  const [user, dispatch] = useReducer(userReducer, {
    status: USER.LOGGED_OUT,
    token: "",
    lang: DEF_LANG,
    theme: DEF_THEME,
  });
  const [navState, navDispatch] = useReducer(NavReducer, {
    current: "home",
  });

  if (isProjectDiscontinued) {
    return <MaintenancePage />;
  }

  return (
    <>
      <UserContext.Provider
        value={{
          user: user,
          userDispatch: dispatch,
        }}
      >
        <ApolloProvider client={client}>
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
        </ApolloProvider>
      </UserContext.Provider>
      <style jsx global>{`
        body {
          background: ${user.theme === M.DARK
            ? "#121212;"
            : "rgb(250, 250, 250)"};
        }
      `}</style>
    </>
  );
}

export default MyApp;
