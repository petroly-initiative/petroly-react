import {
  ApolloProvider,
  ApolloClient,
  useMutation,
  InMemoryCache,
} from "@apollo/client";
import { verifyTokenMutation, refreshTokenMutation } from "../api/mutations";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../state-management/user-state/UserContext";
import { USER, T, URL_ENDPOINT, formatL } from "../constants";

export default function ClientMutator({ children }) {
  const userContext = useContext(UserContext);
  var token = "";
  var rToken = "";

  if (typeof window !== "undefined") {
    token = sessionStorage.getItem("token");
    // if (!token) token = userContext.user.token;  //seems the this line not needed
    rToken = localStorage.getItem("refreshToken");
  }

  /* The default client with no authorization */
  const [client, setClient] = useState(
    new ApolloClient({
      uri: URL_ENDPOINT,
      cache: new InMemoryCache(),
    })
  );

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
  useEffect(async () => {
    if (userContext.user.status === USER.VERIFING) {
      var username = userContext.user.username;
      var lang = userContext.user.lang;
      token = userContext.user.token;

      setClient(
        new ApolloClient({
          uri: URL_ENDPOINT,
          cache: new InMemoryCache(),
          headers: {
            Authorization: "JWT " + token,
            "Accept-Language": lang,
          },
        })
      );

      userContext.userDispatch({
        type: T.SET_CLIENT,
        token,
        username,
        lang,
      });
    } else if (token) verifyToken();
    else if (rToken) refreshToken();
    else if (userContext.user.status === USER.LOGGED_OUT) {
      client.resetStore();

      setClient(
        new ApolloClient({
          uri: URL_ENDPOINT,
          cache: new InMemoryCache(),
          headers: { "Accept-Language": userContext.user.lang },
        })
      );
    }
  }, [userContext.user.status, userContext.user.lang]);

  /*
   * the folllowing twi effects is to handle recieved data after calling
   * verifyToken() and/or refreshToken() above.
   */

  useEffect(() => {
    if (dataVerifyToken && dataVerifyToken.verifyToken.success) {
      var lang = userContext.user.lang;
      setClient(
        new ApolloClient({
          uri: URL_ENDPOINT,
          cache: new InMemoryCache(),
          headers: {
            Authorization: "JWT " + token,
            "Accept-Language": lang,
          },
        })
      );
      // TODO: provide language by the me query
      userContext.userDispatch({
        type: T.SET_CLIENT,
        token,
        lang,
        username: dataVerifyToken.verifyToken.payload.username,
      });
    }
  }, [dataVerifyToken]);

  useEffect(() => {
    if (dataRefreshToken && dataRefreshToken.refreshToken.success) {
      var lang = userContext.user.lang;
      token = dataRefreshToken.refreshToken.token;
      rToken = dataRefreshToken.refreshToken.refreshToken;
      sessionStorage.setItem("token", token);
      localStorage.setItem("refreshToken", rToken);

      setClient(
        new ApolloClient({
          uri: URL_ENDPOINT,
          cache: new InMemoryCache(),
          headers: {
            Authorization: "JWT " + token,
            "Accept-Language": lang,
          },
        })
      );
      userContext.userDispatch({
        type: T.SET_CLIENT,
        token,
        username: dataRefreshToken.refreshToken.payload.username,
        lang: lang,
      });
    }
  }, [dataRefreshToken]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
