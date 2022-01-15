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

export default function ClientMutator({ children }) {
  const { user, userDispatch } = useContext(UserContext);
  var token = "";
  var rToken = "";

  if (typeof window !== "undefined") {
    token = sessionStorage.getItem("token");
    rToken = localStorage.getItem("refreshToken");
  }

  /* The default client with no authorization */

  const authLink = new ApolloLink((operation, forward) => {
    console.log(operation);
    var lang = localStorage.getItem("lang") || DEF_LANG;
    operation.setContext({
      headers: { Authorization: "JWT " + token, "Accept-Language": lang },
    });

    return forward(operation).map((data) => {
      // ...modify result as desired here...
      console.log(data);
      return data;
    });
  });

  const uploadLink = createUploadLink({ uri: URL_ENDPOINT });
  const [client, setClient] = useState(
    new ApolloClient({
      link: ApolloLink.from([authLink, uploadLink]),
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
  useEffect(() => {
    if (user.status === USER.VERIFING) {
      var lang = user.lang;
      token = user.token;

      // set a new client to refetch all quries
      setClient(
        new ApolloClient({
          link: ApolloLink.from([authLink, uploadLink]),
          cache: new InMemoryCache(),
        })
      );
      userDispatch({ type: T.SET_CLIENT, token });
    } else if (token) verifyToken();
    else if (rToken) refreshToken();
    else if (user.status === USER.LOGGED_OUT) {
      client.resetStore();
      client.setLink(
        createHttpLink({
          uri: URL_ENDPOINT,
          headers: { "Accept-Language": user.lang },
        })
      );
    }
  }, [user.status]);

  /*
   * the folllowing two effects are to handle recieved data after calling
   * verifyToken() and/or refreshToken() above.
   */

  useEffect(() => {
    if (dataVerifyToken) {
      if (dataVerifyToken.verifyToken.success) {
        var lang = user.lang;

        // since the found is token is valid
        // no change in the client

        userDispatch({
          type: T.SET_CLIENT,
          username: dataVerifyToken.verifyToken.payload.username,
          token,
        });
      } else if (rToken) refreshToken();
    }
  }, [dataVerifyToken]);

  useEffect(() => {
    if (dataRefreshToken && dataRefreshToken.refreshToken.success) {
      var lang = user.lang;
      token = dataRefreshToken.refreshToken.token;
      rToken = dataRefreshToken.refreshToken.refreshToken;
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
        username: dataRefreshToken.refreshToken.payload.username,
        token,
      });
    }
  }, [dataRefreshToken]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
