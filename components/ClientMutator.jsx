import {
  ApolloProvider,
  ApolloClient,
  useMutation,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { verifyTokenMutation, refreshTokenMutation } from "../api/mutations";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../state-management/user-state/UserContext";
import { USER, T, URL_ENDPOINT, DEF_LANG } from "../constants";
import { onError } from "@apollo/client/link/error";
import PopMsg from "./utilities/PopMsg";

export default function ClientMutator({ children }) {
  const { user, userDispatch } = useContext(UserContext);
  const [MsgVisible, setMsgVisible] = useState(false);
  const [Msg, setMsg] = useState("");
  var token = "";
  var rToken = "";

  if (typeof window !== "undefined") {
    token = sessionStorage.getItem("token");
    rToken = localStorage.getItem("refreshToken");
  }

  /* The default client with no authorization */

  const authLink = new ApolloLink((operation, forward) => {
    var lang = localStorage.getItem("lang") || DEF_LANG;
    operation.setContext({
      headers: { Authorization: "JWT " + token, "Accept-Language": lang },
    });

    return forward(operation).map((data) => {
      // ...modify result as desired here...
      return data;
    });
  });

  // Log any GraphQL errors or network error that occurred
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) => {
        setMsg(message);
        setMsgVisible(true);
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
      });
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });
  const uploadLink = createUploadLink({ uri: URL_ENDPOINT });
  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, uploadLink]),
    cache: new InMemoryCache(),
  });

  const [verifyToken, { data: dataVerifyToken }] = useMutation(
    verifyTokenMutation,
    { variables: { token } }
  );
  const [refreshToken, { data: dataRefreshToken }] = useMutation(
    refreshTokenMutation,
    { variables: { refreshToken: rToken } }
  );

  /*
   * All effects run once react mounted.
   * This effect runs when user status changes,that is, when user is just logged in, or logged out.
   * When user just logged in, its status would be VERIFING, meaning we need to apply that token to a new ApolloClient.
   * For not VERIFING case: if token in userContext is found we verify it, if not, we look for refreshToken in the
   * localStorage, and we try to refresh it to get a vlid token, if not the user is logged out , so we reset the client cache
   * to make sure that no senstive data is cahced.
   */
  useEffect(() => {
    if (user.status === USER.VERIFING) {
      // set a new client to refetch all quries
      // client.setLink(ApolloLink.from([errorLink, authLink, uploadLink]));
      userDispatch({ type: T.SET_CLIENT, token: user.token });
    } else if (user.status === USER.LOGGED_OUT) {
      if (token) verifyToken();
      else if (rToken) refreshToken();
      else client.resetStore();
    }
  }, [user.status]);

  /*
   * the folllowing two effects are to handle recieved data after calling
   * verifyToken() and/or refreshToken() above.
   */

  useEffect(() => {
    if (dataVerifyToken) {
      if (dataVerifyToken.verifyToken.success) {
        // since the found is token is valid
        // no change in the client
        userDispatch({
          type: T.SET_CLIENT,
          username: dataVerifyToken.verifyToken.verifyPayload.payload.username,
          token,
        });
      } else if (rToken) refreshToken();
    }
  }, [dataVerifyToken]);

  useEffect(() => {
    if (dataRefreshToken && dataRefreshToken.refreshToken.success) {
      var lang = user.lang;
      token = dataRefreshToken.refreshToken.refreshPayload.token;
      rToken = dataRefreshToken.refreshToken.refreshPayload.refreshToken;
      sessionStorage.setItem("token", token);
      localStorage.setItem("refreshToken", rToken);

      client.setLink(
        createUploadLink({
          uri: URL_ENDPOINT,
          headers: {
            Authorization: "JWT " + token,
            "Accept-Language": lang,
          },
        })
      );

      userDispatch({
        type: T.SET_CLIENT,
        username: dataRefreshToken.refreshToken.refreshPayload.payload.username,
        token,
      });
    }
  }, [dataRefreshToken]);

  return (
    <>
      <PopMsg
        visible={MsgVisible}
        msg={Msg}
        handleClose={setMsgVisible}
        success
        // you can use failure or none for different message types
      />
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </>
  );
}
